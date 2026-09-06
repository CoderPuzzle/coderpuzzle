"""JavaScript/TypeScript wrapper generation for interactive problems.

Same contract as the C++ side (executors/cpp_interactive.py): one tagged
stream carries the whole case — a tagged value per oracle-construction
key, one per auxiliary method key, then the query budget. Dynamic values
make the generic layer a plain reader; the problem-provided oracle
(assembled source) is constructed from the generic values plus the
budget, and auxiliary values pass through unconverted — JavaScript is
untyped, and TypeScript's method signatures take the same runtime
shapes. A parameter may declare an out_buffer: the wrapper allocates the
array the solution writes into (capacity taken from another parameter's
already-decoded value), the case input for that position stays empty, and
the emitted result becomes [count, entries...] — the filled prefix, the
read4 wire. Void methods are judged by the oracle's verdict().
"""
from __future__ import annotations

from pathlib import Path
from typing import Any

from .base import ExecutorError, PreparedProgram

WRAPPER_HEAD = """\
function openojEmit(line) {
    const fs = require("fs");
    try {
        fs.writeSync(63, line + "\\n");
        return;
    } catch (problem) {
        // no protocol fd (local tooling): stdout is the fallback
    }
    process.stdout.write(line + "\\n");
}

// The tagged generic reader: interactive case state arrives in this
// shape so no per-oracle schema lives in the judge.
class OjReader {
    constructor(buffer) {
        this.bytes = buffer;
        this.position = 0;
    }
    byte() {
        if (this.position >= this.bytes.length) throw new Error("Truncated case payload");
        return this.bytes[this.position++];
    }
    u32() {
        let value = 0;
        for (let i = 0; i < 4; i++) value = (value * 256) + this.byte();
        return value;
    }
    i64() {
        let value = 0n;
        for (let i = 0; i < 8; i++) value = (value << 8n) | BigInt(this.byte());
        const signed = BigInt.asIntN(64, value);
        return Number(safeInt(signed));
    }
    f64() {
        const buffer = new ArrayBuffer(8);
        const view = new DataView(buffer);
        for (let i = 0; i < 8; i++) view.setUint8(i, this.byte());
        return view.getFloat64(0);
    }
    str() {
        const length = this.u32();
        if (this.position + length > this.bytes.length) throw new Error("Truncated case payload");
        const value = this.bytes.toString("utf8", this.position, this.position + length);
        this.position += length;
        return value;
    }
    value() {
        const tag = this.byte();
        switch (tag) {
            case 0x00: return null;
            case 0x01: return false;
            case 0x02: return true;
            case 0x10: return Number(BigInt.asIntN(32, BigInt(this.u32())));
            case 0x11: return this.i64();
            case 0x12: return this.f64();
            case 0x13: return this.str();
            case 0x14: {
                const count = this.u32();
                const items = [];
                for (let i = 0; i < count; i++) items.push(this.value());
                return items;
            }
            case 0x15: {
                const count = this.u32();
                const object = {};
                for (let i = 0; i < count; i++) object[this.value()] = this.value();
                return object;
            }
            default: throw new Error("Unknown tagged value");
        }
    }
}

function safeInt(value) {
    if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
        return value; // stays a BigInt for exact large integers
    }
    return Number(value);
}

function openojJSON(value) {
    return JSON.stringify(value, (_key, item) => (typeof item === "bigint" ? Number(item) : item));
}
"""

MAIN_TEMPLATE = """\
async function main() {
    const chunks = [];
    for (;;) {
        const chunk = await new Promise((resolve) => {
            process.stdin.once("readable", () => resolve(process.stdin.read()));
        });
        if (chunk === null) break;
        chunks.push(chunk);
    }
    const reader = new OjReader(Buffer.concat(chunks));
@VALUE_READS@
    const budget = reader.value()@BUDGET_CAST@;
    const solution = new Solution();
    const oracle = new @ORACLE_CLASS@([@ORACLE_ARGS@], budget);
@CALL_BLOCK@
}

main().catch((problem) => {
    openojEmit("__OPENOJ_RESULT__" + openojJSON({ status: "runtime_error", error: String(problem && problem.message ? problem.message : problem) }));
});
"""


def prepare_interactive(executor, job_root: Path, scratch: Path, code: str,
                        invocation: dict[str, Any], assembly,
                        entrypoint: str | None = None,
                        is_typescript: bool = False) -> PreparedProgram:
    provided = (invocation.get("provided") or {}).get("oracle")
    if not provided:
        raise ExecutorError("Interactive problems must carry invocation.provided.oracle")
    oracle_class = provided.get("class")
    language = "typescript" if is_typescript else "javascript"
    method = (invocation.get("entrypoints", {}) or {}).get(
        language, invocation.get("method")
    )
    if not isinstance(method, str) or not method.isidentifier():
        raise ExecutorError(f"Invalid {language} entry point")
    construct_keys = list(provided.get("construct", ()))
    auxiliary_keys = list(provided.get("auxiliary", ()))
    parameters = invocation.get("parameters") or []
    # An out_buffer parameter allocates a buffer in its declared position:
    # it consumes no case input, and its capacity names the case key whose
    # decoded value sizes the array (the read4 wire).
    buffer_slots: dict[int, str] = {}
    for index, parameter in enumerate(parameters):
        if not isinstance(parameter, dict) or parameter.get("out_buffer") is None:
            continue
        out_buffer = parameter["out_buffer"]
        if not isinstance(out_buffer, dict) or not isinstance(out_buffer.get("capacity_from"), str):
            raise ExecutorError("An out_buffer parameter needs a 'capacity_from' case key")
        buffer_slots[index] = out_buffer["capacity_from"]
    parameter_keys = [
        parameter.get("name")
        for parameter in parameters
        if isinstance(parameter, dict) and parameter.get("out_buffer") is None
    ]
    if parameter_keys != auxiliary_keys:
        raise ExecutorError(
            "Interactive parameters (excluding out_buffer ones) must match provided.oracle.auxiliary")

    value_reads = "\n".join(
        f"    const openojValue{index} = reader.value();"
        for index in range(len(construct_keys) + len(auxiliary_keys))
    )
    oracle_args = ", ".join(f"openojValue{index}" for index in range(len(construct_keys)))
    def aux(index: int) -> str:
        name = f"openojValue{len(construct_keys) + index}"
        # TypeScript infers the reader's union as {}; the submission's
        # parameter types govern at run time either way
        return f"{name} as any" if is_typescript else name

    def anycast(expression: str) -> str:
        return f"({expression}) as any" if is_typescript else expression

    # Case key -> an expression for its already-decoded value; an out_buffer
    # capacity may name any decoded key.
    capacity_sources = {
        **{key: f"openojValue{index}" for index, key in enumerate(construct_keys)},
        **{key: f"openojValue{len(construct_keys) + index}" for index, key in enumerate(auxiliary_keys)},
    }
    buffer_variables: dict[int, str] = {}
    buffer_lines = []
    for slot, capacity_key in buffer_slots.items():
        capacity = capacity_sources.get(capacity_key)
        if capacity is None:
            raise ExecutorError(f"out_buffer capacity_from {capacity_key!r} is not a case key")
        variable = f"openojBuffer{slot}"
        buffer_lines.append(
            f"    const {variable} = new Array(Math.max(0, Math.trunc({anycast(capacity)}))).fill(null);"
        )
        buffer_variables[slot] = variable

    parameter_arguments = []
    auxiliary_cursor = 0
    buffer_slot = None
    for index, parameter in enumerate(parameters):
        if index in buffer_variables:
            if buffer_slot is None:
                buffer_slot = index
            parameter_arguments.append(buffer_variables[index])
            continue
        if not isinstance(parameter, dict):
            raise ExecutorError("Every interactive parameter must be an object")
        name = parameter.get("name")
        if name not in capacity_sources:
            raise ExecutorError(f"Auxiliary key {name!r} has no case input")
        parameter_arguments.append(aux(auxiliary_cursor))
        auxiliary_cursor += 1

    value_reads = "\n".join([value_reads, *buffer_lines])

    # A {"kind": "void"} return_type is a declared void, not a value: the
    # oracle's verdict() judges those (same rule as the python/java sides).
    has_return = bool(invocation.get("return_type")) and invocation["return_type"].get("kind") != "void"
    if has_return:
        if buffer_slot is None:
            call_block = (
                f"    const actual = solution.{method}(oracle{', ' + ', '.join(parameter_arguments) if parameter_arguments else ''});\n"
                '    openojEmit("__OPENOJ_RESULT__" + openojJSON({ status: "completed", actual: actual }));'
            )
        else:
            buffer = buffer_variables[buffer_slot]
            call_block = (
                f"    const actual = solution.{method}(oracle{', ' + ', '.join(parameter_arguments) if parameter_arguments else ''});\n"
                "    const openojCount = Math.trunc(actual);\n"
                f"    let openojWritten = openojCount;\n"
                f"    if (openojWritten < 0) openojWritten = 0;\n"
                f"    if (openojWritten > {buffer}.length) openojWritten = {buffer}.length;\n"
                '    openojEmit("__OPENOJ_RESULT__" + openojJSON({ status: "completed", actual: [openojCount, '
                f"{buffer}.slice(0, openojWritten)] }}));"
            )
    else:
        call_block = (
            f"    await solution.{method}(oracle{', ' + ', '.join(parameter_arguments) if parameter_arguments else ''});\n"
            '    openojEmit("__OPENOJ_RESULT__" + openojJSON({ status: "completed", actual: oracle.verdict() }));'
        )

    provided_source = "".join(
        content + "\n"
        for name, content in sorted((assembly or {}).get("provided", {}).items())
        if name.endswith(".ts" if is_typescript else ".js")
    )
    main_source = (
        MAIN_TEMPLATE
        .replace("@VALUE_READS@", value_reads)
        .replace("@BUDGET_CAST@", " as any" if is_typescript else "")
        .replace("@ORACLE_CLASS@", oracle_class)
        .replace("@ORACLE_ARGS@", oracle_args)
        .replace("@CALL_BLOCK@", call_block)
    )
    source = WRAPPER_HEAD + "\n" + provided_source + code + "\n" + main_source

    if is_typescript:
        # The shared wrapper is JS-shaped; TypeScript needs the ambient
        # node names declared and class fields spelled out to accept it
        source = (
            'declare const require: (name: string) => any;\n'
            'declare const process: any;\n'
            'declare const Buffer: any;\n'
            + source
        )
        source = source.replace(
            'class OjReader {\n    constructor(buffer) {',
            'class OjReader {\n    bytes: any;\n    position = 0;\n    constructor(buffer: any) {',
        )
        source = source.replace('object[this.value()] = this.value();', 'object[String(this.value())] = this.value();')

    suffix = "ts" if is_typescript else "js"
    source_path = job_root / f"main.{suffix}"
    source_path.write_text(source, encoding="utf-8")
    source_path.chmod(0o444)

    if is_typescript:
        javascript_path = job_root / "main.js"
        executor.compile(
            job_root,
            (
                executor.compiler_path,
                "--target",
                "ES2022",
                "--module",
                "commonjs",
                "--lib",
                "ES2022",
                "--skipLibCheck",
                "--pretty",
                "false",
                "--outDir",
                str(job_root),
                str(source_path),
            ),
            javascript_path,
            # /usr/local/bin is required, not cosmetic: tsc is
            # `#!/usr/bin/env node` and node lives only there (matches
            # typescript.py).
            {"PATH": "/usr/local/bin:/usr/bin:/bin", "HOME": "/nonexistent", "TMPDIR": "/tmp", "LANG": "C.UTF-8"},
        )
        run_path = javascript_path
    else:
        run_path = source_path

    return PreparedProgram(
        command=(str(executor.node_path), "--stack-size=2048", str(run_path)),
        # --stack-size cannot travel in NODE_OPTIONS (node rejects the whole
        # variable and aborts), so it rides on the command line instead.
        environment={"PATH": "/usr/bin:/bin", "HOME": "/nonexistent", "NODE_OPTIONS": "--disable-proto=throw --no-addons --max-old-space-size=192", "TMPDIR": str(scratch), "LANG": "C.UTF-8"},
    )
