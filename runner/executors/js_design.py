"""Design-kind wrappers for JavaScript and TypeScript.

The design protocol (python_harness._invoke_design is the reference):
a case carries `actions` and `params`; params[0] constructs the
instance; each action names a method (or {"call", "repeat"} for a
randomized method judged by a frequency table over its repeated
results); a {"$prev"} argument pipes the previous raw result into the
next call. The whole case travels as one tagged stream
(design_interactive.encode_design_case). Dynamic values make the
replay loop a plain generated function here; the wrapper is written
per problem from the invocation's method table so method dispatch and
arity checks are compile-time where the language allows it.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .base import ExecutorError, PreparedProgram

WRAPPER_HEAD = """\
function coderpuzzleEmit(line) {
    const fs = require("fs");
    try {
        fs.writeSync(63, line + "\\n");
        return;
    } catch (problem) {
        // no protocol fd (local tooling): stdout is the fallback
    }
    process.stdout.write(line + "\\n");
}

class OjReader {
    constructor(buffer) { this.bytes = buffer; this.position = 0; }
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
        return Number(BigInt.asIntN(64, value));
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
            case 0x14: { const count = this.u32(); const items = []; for (let i = 0; i < count; i++) items.push(this.value()); return items; }
            case 0x15: { const count = this.u32(); const object = {}; for (let i = 0; i < count; i++) object[String(this.value())] = this.value(); return object; }
            default: throw new Error("Unknown tagged value");
        }
    }
}

function coderpuzzleJSON(value) {
    return JSON.stringify(value, (_key, item) => {
        if (typeof item === "bigint") return Number(item);
        if (item === undefined) return null;
        return item;
    });
}
"""

CODEC_DISPATCH = """\
// Codec-aware argument/result conversion, mirroring the harness's
// decode/encode (python_harness._invoke_design). Only the tree codecs
// transform; json is the identity. The branches below are trimmed to the
// codecs this invocation actually declares — TypeScript resolves every
// name at compile time regardless of reachability, so a branch calling
// an omitted helper (for a type the bundle never asked for) would fail
// to compile even though it can never run.
function coderpuzzleDecode(value, codec) {
@TREE_DECODE_BRANCH@
@NESTED_DECODE_BRANCH@
    return value;
}

function coderpuzzleEncode(value, codec) {
    if (value === undefined) {
        return null;
    }
@TREE_ENCODE_BRANCH@
@NESTED_ENCODE_BRANCH@
    return value;
}
"""

# Only emitted when the invocation actually uses the "nested" codec —
# NestedInteger is the bundle's own provided/ type (docs/CODECS.md), not
# a judge-owned definition, so this helper must not reference it
# unconditionally (TypeScript's compile-time check catches it even when
# unreachable; plain JS would not).
NESTED_CODEC_HELPERS = """\
// Nested JSON ([1,[4,[6]]], bare integers as integer holds) ->
// the bundle-provided NestedInteger, mirroring the harness decode.
function coderpuzzleNestedFromArray(value) {
    if (typeof value === "number") {
        return new NestedInteger(value);
    }
    const node = new NestedInteger();
    if (Array.isArray(value)) {
        for (const item of value) {
            node.add(coderpuzzleNestedFromArray(item));
        }
    } else if (value !== null && value !== undefined) {
        throw new Error("Expected a nested list");
    }
    return node;
}

// NestedInteger -> nested JSON, so results compare as plain JSON.
function coderpuzzleNestedToArray(node) {
    if (node === null || node === undefined) {
        return null;
    }
    if (node.isInteger()) {
        return node.getInteger();
    }
    return node.getList().map(coderpuzzleNestedToArray);
}
"""

# Only emitted when the invocation actually uses the "tree_node" codec —
# TreeNode is the bundle's own provided/ type, not a judge-owned
# definition; see the NESTED_CODEC_HELPERS note above.
TREE_CODEC_HELPERS = """\
// Level-order array (nulls for absent children) -> TreeNode tree, two
// slots consumed per queued node exactly like the harness's codec.
function coderpuzzleTreeFromArray(slots) {
    if (!Array.isArray(slots) || slots.length === 0 || slots[0] === null) {
        return null;
    }
    const root = new TreeNode(slots[0]);
    const queue = [root];
    let index = 1;
    while (queue.length > 0 && index < slots.length) {
        const node = queue.shift();
        if (index < slots.length) {
            if (slots[index] !== null) {
                node.left = new TreeNode(slots[index]);
                queue.push(node.left);
            }
            index++;
        }
        if (index < slots.length) {
            if (slots[index] !== null) {
                node.right = new TreeNode(slots[index]);
                queue.push(node.right);
            }
            index++;
        }
    }
    return root;
}

// TreeNode tree -> level-order array, trailing nulls trimmed, so results
// compare as plain JSON.
function coderpuzzleTreeToArray(root) {
    if (root === null || root === undefined) {
        return [];
    }
    const output = [];
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        if (node === null) {
            output.push(null);
            continue;
        }
        output.push(node.val);
        queue.push(node.left);
        queue.push(node.right);
    }
    while (output.length > 0 && output[output.length - 1] === null) {
        output.pop();
    }
    return output;
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
    const actions = reader.value();
    const params = reader.value();
    if (!Array.isArray(actions) || !Array.isArray(params) || actions.length !== params.length) {
        throw new Error("Design input requires equally sized actions and params");
    }
    const constructorCodecs = @CTOR_CODECS@;
    const methodCodecs = @METHOD_CODECS@;
    const returnCodecs = @RETURN_CODECS@;
    const methodKinds = @METHOD_KINDS@;
    const decodeConstructorRow = (row) => row.map((argument, index) => coderpuzzleDecode(argument, constructorCodecs[index] || "json"));
    const constructorArguments = params[0].map((argument, index) => coderpuzzleDecode(argument, constructorCodecs[index] || "json"));
    const solution = new @CLASS_NAME@(...constructorArguments);
    // Named instances ({"new": handle} actions) live here for the whole
    // replay; $ref arguments and "on" targets resolve through it. The
    // primary instance from params[0] is registered when actions[0] names
    // it, and stays the default target otherwise.
    const instances = new Map();
    const register = (handle, instance) => {
        if (typeof handle !== "string" || handle === "" || instances.has(handle)) {
            throw new Error("Duplicate or invalid design instance handle: " + handle);
        }
        instances.set(handle, instance);
    };
    if (actions[0] !== null && typeof actions[0] === "object" && !Array.isArray(actions[0]) && "new" in actions[0]) {
        register(actions[0].new, solution);
    }
    const outputs = [null];
    let previous = null;
    for (let step = 1; step < actions.length; step++) {
        let action = actions[step];
        // A {"new": handle} action constructs another instance of the
        // design class from this step's params row; constructors return
        // nothing, so the recorded slot is null.
        if (action !== null && typeof action === "object" && !Array.isArray(action) && "new" in action) {
            register(action.new, new @CLASS_NAME@(...decodeConstructorRow(params[step])));
            outputs.push(null);
            previous = null;
            continue;
        }
        let target = solution;
        let repeat = 1;
        if (action !== null && typeof action === "object" && !Array.isArray(action)) {
            repeat = Number(action.repeat || 1);
            if ("on" in action) {
                if (!instances.has(action.on)) {
                    throw new Error("Unknown design instance handle: " + action.on);
                }
                target = instances.get(action.on);
            }
            action = action.call;
        }
        const rawArguments = params[step];
        const codecs = methodCodecs[action] || [];
        const kinds = methodKinds[action] || [];
        // A piped argument ({"$prev": ...}) crosses as the previous call's
        // live object, not its wire form; an instance reference
        // ({"$ref": handle}) resolves to the named live instance; everything
        // else decodes through its parameter codec
        // (python_harness._invoke_design).
        const decodedArguments = rawArguments.map((argument, index) => {
            if (argument !== null && typeof argument === "object" && !Array.isArray(argument)
                    && Object.keys(argument).length === 1 && "$prev" in argument) {
                return previous;
            }
            const isReference = argument !== null && typeof argument === "object" && !Array.isArray(argument)
                    && Object.keys(argument).length === 1 && "$ref" in argument;
            const expectsInstance = kinds[index] === "instance";
            if (isReference || expectsInstance) {
                if (!isReference || !expectsInstance) {
                    throw new Error("Design action " + step + " parameter " + (index + 1)
                        + ': {"$ref": handle} instance references are only valid on an instance parameter');
                }
                if (!instances.has(argument.$ref)) {
                    throw new Error("Unknown design instance handle: " + argument.$ref);
                }
                return instances.get(argument.$ref);
            }
            return coderpuzzleDecode(argument, codecs[index] || "json");
        });
        const returnCodec = returnCodecs[action] || "json";
        if (repeat > 1) {
            const frequencies = new Map();
            let last = null;
            for (let trial = 0; trial < repeat; trial++) {
                last = target[action](...decodedArguments);
                const key = coderpuzzleJSON(coderpuzzleEncode(last, returnCodec));
                frequencies.set(key, (frequencies.get(key) || 0) + 1);
            }
            const table = {};
            for (const [key, count] of frequencies) table[key] = count;
            outputs.push(table);
            previous = last;
        } else {
            const rawResult = target[action](...decodedArguments);
            outputs.push(coderpuzzleEncode(rawResult, returnCodec));
            previous = rawResult;
        }
    }
    coderpuzzleEmit("__CODERPUZZLE_RESULT__" + coderpuzzleJSON({ status: "completed", actual: outputs }));
}

main().catch((problem) => {
    coderpuzzleEmit("__CODERPUZZLE_RESULT__" + coderpuzzleJSON({ status: "runtime_error", error: String(problem && problem.message ? problem.message : problem) }));
});
"""


def prepare_design(executor, job_root: Path, scratch: Path, code: str,
                   invocation: dict[str, Any], assembly,
                   is_typescript: bool = False) -> PreparedProgram:
    class_name = invocation.get("class_name", "Solution")
    if not isinstance(class_name, str) or not class_name.isidentifier():
        raise ExecutorError("Invalid design entry class")

    # Codec tables (python_harness._invoke_design's per-method codec map):
    # each argument is decoded from its wire form, each result encoded back;
    # the kinds table carries each parameter's value_type kind so an
    # "instance" parameter (a live design object by {"$ref": handle}) is
    # recognized while decoding.
    constructor = invocation.get("constructor", {}).get("parameters", [])
    constructor_codecs = [p.get("codec", "json") for p in constructor if isinstance(p, dict)]
    method_codecs: dict[str, list[str]] = {}
    method_kinds: dict[str, list[str]] = {}
    return_codecs: dict[str, str] = {}
    for method in invocation.get("methods", []):
        if not isinstance(method, dict) or not isinstance(method.get("name"), str):
            continue
        method_codecs[method["name"]] = [
            p.get("codec", "json") for p in method.get("parameters", []) if isinstance(p, dict)
        ]
        method_kinds[method["name"]] = [
            (p.get("value_type") or {}).get("kind", "json")
            for p in method.get("parameters", [])
            if isinstance(p, dict)
        ]
        return_codecs[method["name"]] = method.get("return_codec", "json")

    all_codecs = list(constructor_codecs) + [return_codecs.get(name, "json") for name in method_codecs]
    for codecs in method_codecs.values():
        all_codecs.extend(codecs)
    needs_tree = "tree_node" in all_codecs
    needs_nested = "nested" in all_codecs
    codec_dispatch = (
        CODEC_DISPATCH
        .replace(
            "@TREE_DECODE_BRANCH@",
            '    if (codec === "tree_node") {\n        return coderpuzzleTreeFromArray(value);\n    }' if needs_tree else "",
        )
        .replace(
            "@NESTED_DECODE_BRANCH@",
            '    if (codec === "nested") {\n        return coderpuzzleNestedFromArray(value);\n    }' if needs_nested else "",
        )
        .replace(
            "@TREE_ENCODE_BRANCH@",
            '    if (codec === "tree_node") {\n        return coderpuzzleTreeToArray(value);\n    }' if needs_tree else "",
        )
        .replace(
            "@NESTED_ENCODE_BRANCH@",
            '    if (codec === "nested") {\n        return coderpuzzleNestedToArray(value);\n    }' if needs_nested else "",
        )
    )
    codec_helpers = (
        codec_dispatch
        + (NESTED_CODEC_HELPERS if needs_nested else "")
        + (TREE_CODEC_HELPERS if needs_tree else "")
    )

    provided_source = "".join(
        content + "\n"
        for name, content in sorted((assembly or {}).get("provided", {}).items())
        if name.endswith(".ts" if is_typescript else ".js")
    )
    main_source = (
        MAIN_TEMPLATE
        .replace("@CLASS_NAME@", class_name)
        .replace("@CTOR_CODECS@", json.dumps(constructor_codecs))
        .replace("@METHOD_CODECS@", json.dumps(method_codecs))
        .replace("@RETURN_CODECS@", json.dumps(return_codecs))
        .replace("@METHOD_KINDS@", json.dumps(method_kinds))
    )
    if not is_typescript:
        main_source = main_source.replace("...(constructorArguments as any[]))", "...constructorArguments)")
        main_source = main_source.replace("(solution[action] as any)", "solution[action]")
    else:
        main_source = main_source.replace(
            f"new {class_name}(...constructorArguments);",
            f"new ({class_name} as any)(...constructorArguments);",
        )
        main_source = main_source.replace(
            f"new {class_name}(...decodeConstructorRow(params[step]))",
            f"new ({class_name} as any)(...decodeConstructorRow(params[step]))",
        )
        main_source = main_source.replace(".map((argument, index) => {", ".map((argument: any, index: number) => {")
        main_source = main_source.replace("target[action](...decodedArguments)", "(target[action] as any)(...decodedArguments)")
    if is_typescript:
        # Emitted codec helpers may reference TreeNode/NestedInteger,
        # whose real classes live in the bundle's own provided/typescript/
        # — that source must precede the wrapper for those references to
        # resolve.
        source = provided_source + "\n" + WRAPPER_HEAD + "\n" + codec_helpers + "\n" + code + "\n" + main_source
    else:
        source = WRAPPER_HEAD + "\n" + codec_helpers + "\n" + provided_source + code + "\n" + main_source
    if is_typescript:
        source = (
            'declare const require: (name: string) => any;\n'
            'declare const process: any;\n'
            'declare const Buffer: any;\n'
            + source
        )
        source = source.replace(
            'class OjReader {\n    constructor(buffer) {',
            'class OjReader {\n    bytes: any; position = 0;\n    constructor(buffer: any) {',
        )
        source = source.replace(
            '    const actions = reader.value();',
            '    const actions: any = reader.value();',
        ).replace(
            '    const params = reader.value();',
            '    const params: any = reader.value();',
        ).replace(
            '        let action = actions[step];',
            '        let action: any = actions[step];',
        ).replace(
            '        const rawArguments = params[step];',
            '        const rawArguments: any[] = params[step];',
        ).replace(
            '        const constructorArguments = params[0];',
            '        const constructorArguments: any[] = params[0];',
        ).replace(
            '        let target = solution;',
            '        let target: any = solution;',
        )

    suffix = "ts" if is_typescript else "js"
    source_path = job_root / f"main.{suffix}"
    source_path.write_text(source, encoding="utf-8")
    source_path.chmod(0o444)

    if is_typescript:
        javascript_path = job_root / "main.js"
        executor.compile(
            job_root,
            (
                executor.compiler_path, "--target", "ES2022", "--module", "commonjs",
                "--lib", "ES2022", "--skipLibCheck", "--pretty", "false",
                "--outDir", str(job_root), str(source_path),
            ),
            javascript_path,
            # /usr/local/bin is required, not cosmetic: tsc is `#!/usr/bin/env
            # node` and node lives only there (matches typescript.py).
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
