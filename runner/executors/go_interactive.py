"""Go wrapper generation for interactive problems.

Same contract as the C++ side (executors/cpp_interactive.py): one tagged
stream carries the whole case — a tagged value per oracle-construction
key, one per auxiliary method key, then the query budget. Go's
interface{} makes the generic layer trivial; the problem-provided oracle
(a `package main` source beside the wrapper) takes the construction
values as []any plus the budget, and the wrapper converts auxiliary
values to the method's typed parameters with generated converters. A
parameter may declare an out_buffer: the wrapper allocates the slice the
solution writes into (element type from the parameter's value_type, bytes
by default; capacity taken from another parameter's already-decoded
value), the case input for that position stays empty, and the emitted
result becomes [count, entries...] — the filled prefix, the read4 wire.
Void methods are judged by the oracle's Verdict() any.
"""
from __future__ import annotations

from pathlib import Path
from typing import Any

from .base import ExecutorError, PreparedProgram
from .typed import go_type, type_spec

WRAPPER_HEAD = """\
package main

import (
	"encoding/json"
	"fmt"
	"os"
	"unsafe"
)

func coderpuzzleEmit(line string) {
	if channel := os.NewFile(63, "protocol"); channel != nil {
		if _, errorValue := channel.WriteString(line + "\\n"); errorValue == nil {
			return
		}
	}
	fmt.Println(line)
}

// The tagged generic reader: interactive case state arrives in this
// shape so no per-oracle schema lives in the judge.
type ojReader struct {
	bytes   []byte
	position int
}

func (r *ojReader) byte() byte {
	if r.position >= len(r.bytes) {
		panic("Truncated case payload")
	}
	value := r.bytes[r.position]
	r.position++
	return value
}

func (r *ojReader) u32() uint32 {
	var value uint32
	for i := 0; i < 4; i++ {
		value = (value << 8) | uint32(r.byte())
	}
	return value
}

func (r *ojReader) i64() int64 {
	var value uint64
	for i := 0; i < 8; i++ {
		value = (value << 8) | uint64(r.byte())
	}
	return int64(value)
}

func (r *ojReader) f64() float64 {
	bits := uint64(r.i64())
	return float64FromBits(bits)
}

func float64FromBits(bits uint64) float64 {
	return *(*float64)(unsafe.Pointer(&bits))
}

func (r *ojReader) str() string {
	length := r.u32()
	value := make([]byte, length)
	for i := range value {
		value[i] = r.byte()
	}
	return string(value)
}

func (r *ojReader) value() any {
	tag := r.byte()
	switch tag {
	case 0x00:
		return nil
	case 0x01:
		return false
	case 0x02:
		return true
	case 0x10:
		return int64(int32(r.u32()))
	case 0x11:
		return r.i64()
	case 0x12:
		return r.f64()
	case 0x13:
		return r.str()
	case 0x14:
		count := r.u32()
		items := make([]any, 0, count)
		for i := uint32(0); i < count; i++ {
			items = append(items, r.value())
		}
		return items
	case 0x15:
		count := r.u32()
		object := make(map[string]any, count)
		for i := uint32(0); i < count; i++ {
			key := r.value().(string)
			object[key] = r.value()
		}
		return object
	default:
		panic("Unknown tagged value")
	}
}

// coderpuzzleInt reads an integer out of an already-decoded case value: an
// out_buffer capacity names another parameter, decoded either as a typed
// auxiliary (int/int64) or as a generic construct value (any).
func coderpuzzleInt(value any) int64 {
	switch number := value.(type) {
	case int:
		return int64(number)
	case int64:
		return number
	case float64:
		return int64(number)
	default:
		panic("Expected an integer")
	}
}
"""

MAIN_TEMPLATE = """\
func main() {
	defer func() {
		if problem := recover(); problem != nil {
			coderpuzzleEmit("__CODERPUZZLE_RESULT__" + `{"status":"runtime_error","error":` + coderpuzzleJSON(fmt.Sprintf("%v", problem)) + "}")
		}
	}()
	bytes_ := make([]byte, 0, 4096)
	buffer := make([]byte, 4096)
	for {
		n, errorValue := os.Stdin.Read(buffer)
		bytes_ = append(bytes_, buffer[:n]...)
		if errorValue != nil {
			break
		}
	}
	reader := &ojReader{bytes: bytes_}
@VALUE_READS@
	budgetValue := reader.value()
	budget, budgetOk := budgetValue.(int64)
	if !budgetOk {
		panic("Budget must be an integer")
	}
@CONVERT_LINES@
	solution := &@CLASS_NAME@{}
	oracle := New@ORACLE_CLASS@([]any{@ORACLE_ARGS@}, budget)
@CALL_BLOCK@
}
"""

JSON_HELPER = """\
func coderpuzzleJSON(value any) string {
	encoded, errorValue := json.Marshal(value)
	if errorValue != nil {
		panic(errorValue)
	}
	return string(encoded)
}
"""


def strip_package(source: str) -> str:
    """The submission arrives as its own `package main` file; inside the
    assembled wrapper the package clause is dropped."""
    lines = [line for line in source.splitlines() if not line.strip().startswith("package ")]
    return "\n".join(lines)


def _go_type(spec: dict[str, Any]) -> str:
    return go_type(spec)


def _convert(spec: dict[str, Any], source: str) -> str:
    kind = spec["kind"]
    if kind == "integer":
        bits = spec.get("bits", 32)
        if bits == 64:
            return f'(func() int64 {{ v, ok := {source}.(int64); if !ok {{ panic("Expected an integer") }}; return v }})()'
        return f'(func() int {{ v, ok := {source}.(int64); if !ok {{ panic("Expected an integer") }}; return int(v) }})()'
    if kind == "number":
        return f'(func() float64 {{ switch v := {source}.(type) {{ case float64: return v; case int64: return float64(v); default: panic("Expected a number") }} }})()'
    if kind == "boolean":
        return f'(func() bool {{ v, ok := {source}.(bool); if !ok {{ panic("Expected a boolean") }}; return v }})()'
    if kind == "string":
        return f'(func() string {{ v, ok := {source}.(string); if !ok {{ panic("Expected a string") }}; return v }})()'
    if kind == "array":
        inner = _convert(spec["items"], "item")
        return (
            f'(func() []{_go_type(spec["items"])} {{ source, ok := {source}.([]any); if !ok {{ panic("Expected an array") }}; '
            f'out := make([]{_go_type(spec["items"])}, 0, len(source)); '
            f'for _, item := range source {{ out = append(out, {inner}) }}; return out }})()'
        )
    raise ExecutorError(f"Interactive auxiliary type {kind} is not supported in Go")


def _go_buffer_element(spec: Any) -> str:
    """The slice type an out_buffer parameter allocates: bytes unless the
    parameter declares its own array value_type."""
    if spec is None:
        return "byte"
    spec = type_spec(spec, "out_buffer")
    if spec["kind"] == "array":
        return _go_type(spec["items"])
    raise ExecutorError("An out_buffer parameter needs an array value_type (or none, for bytes)")


def _go_entries(element: str, variable: str) -> tuple[str, str]:
    """(entry slice type, per-entry expression) for a captured prefix.
    Bytes serialize as 1-char strings — the char[] wire the java harness
    emits; typed elements pass through natively."""
    if element == "byte":
        return "string", f"string(rune({variable}))"
    return element, variable


def prepare_interactive(executor, job_root: Path, scratch: Path, code: str,
                        invocation: dict[str, Any], assembly) -> PreparedProgram:
    provided = (invocation.get("provided") or {}).get("oracle")
    if not provided:
        raise ExecutorError("Interactive problems must carry invocation.provided.oracle")
    oracle_class = provided.get("class")
    method = (invocation.get("entrypoints", {}) or {}).get("go", invocation.get("method"))
    if not isinstance(method, str) or not method.isidentifier():
        raise ExecutorError("Invalid Go entry point")
    construct_keys = list(provided.get("construct", ()))
    auxiliary_keys = list(provided.get("auxiliary", ()))
    parameters = invocation.get("parameters") or []
    specs = {
        parameter.get("name"): parameter.get("value_type")
        for parameter in parameters
        if isinstance(parameter, dict)
    }
    # An out_buffer parameter allocates a buffer in its declared position:
    # it consumes no case input, and its capacity names the case key whose
    # decoded value sizes the slice (the read4 wire).
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
        f"\tcoderpuzzleValue{index} := reader.value()" for index in range(len(construct_keys) + len(auxiliary_keys))
    )
    convert_lines = []
    # Case key -> an expression for its already-decoded value; an out_buffer
    # capacity may name any decoded key.
    capacity_sources: dict[str, str] = {}
    for index, key in enumerate(construct_keys):
        capacity_sources[key] = f"coderpuzzleInt(coderpuzzleValue{index})"
    auxiliary_variables: dict[str, str] = {}
    for index, key in enumerate(auxiliary_keys):
        spec = specs.get(key)
        if spec is None:
            raise ExecutorError(f"Auxiliary key {key!r} has no invocation parameter type")
        spec = type_spec(spec, key)
        variable = f"coderpuzzleAux{index}"
        convert_lines.append(
            f"\t{variable} := {_convert(spec, f'coderpuzzleValue{len(construct_keys) + index}')}"
        )
        auxiliary_variables[key] = variable
        capacity_sources[key] = f"coderpuzzleInt({variable})"

    buffer_variables: dict[int, str] = {}
    for slot, capacity_key in buffer_slots.items():
        capacity = capacity_sources.get(capacity_key)
        if capacity is None:
            raise ExecutorError(f"out_buffer capacity_from {capacity_key!r} is not a case key")
        element = _go_buffer_element(specs.get(parameters[slot].get("name")))
        variable = f"coderpuzzleBuffer{slot}"
        convert_lines.append(
            f"\t{variable}Capacity := {capacity}\n"
            f"\tif {variable}Capacity < 0 {{\n\t\t{variable}Capacity = 0\n\t}}\n"
            f"\t{variable} := make([]{element}, {variable}Capacity)"
        )
        buffer_variables[slot] = (variable, element)

    parameter_arguments = []
    buffer_slot = None
    for index, parameter in enumerate(parameters):
        if index in buffer_variables:
            if buffer_slot is None:
                buffer_slot = index
            parameter_arguments.append(buffer_variables[index][0])
        else:
            if not isinstance(parameter, dict):
                raise ExecutorError("Every interactive parameter must be an object")
            parameter_arguments.append(auxiliary_variables[parameter.get("name")])

    oracle_args = ", ".join(
        [f"coderpuzzleValue{index}" for index in range(len(construct_keys))]
    )
    call_arguments = ", ".join(["oracle", *parameter_arguments])
    # A {"kind": "void"} return_type is a declared void, not a value: the
    # oracle's Verdict() judges those (same rule as the python/java sides).
    has_return = bool(invocation.get("return_type")) and invocation["return_type"].get("kind") != "void"
    if has_return:
        if buffer_slot is None:
            call_block = (
                f"\tactual := solution.{method}({call_arguments})\n"
                '\tcoderpuzzleEmit("__CODERPUZZLE_RESULT__" + fmt.Sprintf(`{"status":"completed","actual":%s}`, coderpuzzleJSON(actual)))'
            )
        else:
            buffer, element = buffer_variables[buffer_slot]
            entry_type, entry_expression = _go_entries(element, f"{buffer}[coderpuzzleIndex]")
            call_block = (
                f"\tactual := solution.{method}({call_arguments})\n"
                f"\tcoderpuzzleCount := coderpuzzleInt(actual)\n"
                f"\tcoderpuzzleWritten := coderpuzzleCount\n"
                f"\tif coderpuzzleWritten < 0 {{\n\t\tcoderpuzzleWritten = 0\n\t}}\n"
                f"\tif coderpuzzleWritten > int64(len({buffer})) {{\n\t\tcoderpuzzleWritten = int64(len({buffer}))\n\t}}\n"
                f"\tcoderpuzzleEntries := make([]{entry_type}, 0, coderpuzzleWritten)\n"
                f"\tfor coderpuzzleIndex := int64(0); coderpuzzleIndex < coderpuzzleWritten; coderpuzzleIndex++ {{\n"
                f"\t\tcoderpuzzleEntries = append(coderpuzzleEntries, {entry_expression})\n"
                f"\t}}\n"
                '\tcoderpuzzleEmit("__CODERPUZZLE_RESULT__" + fmt.Sprintf(`{"status":"completed","actual":%s}`, coderpuzzleJSON([]any{coderpuzzleCount, coderpuzzleEntries})))'
            )
    else:
        call_block = (
            f"\tsolution.{method}({call_arguments})\n"
            '\tcoderpuzzleEmit("__CODERPUZZLE_RESULT__" + fmt.Sprintf(`{"status":"completed","actual":%s}`, coderpuzzleJSON(oracle.Verdict())))'
        )

    provided_files = []
    for name, content in sorted((assembly or {}).get("provided", {}).items()):
        if name.endswith(".go"):
            # separate-file assembly: each file keeps its own package clause
            provided_files.append((name, content))

    main_source = (
        MAIN_TEMPLATE
        .replace("@VALUE_READS@", value_reads)
        .replace("@CONVERT_LINES@", "\n".join(convert_lines))
        .replace("@CLASS_NAME@", invocation.get("class_name", "Solution"))
        .replace("@ORACLE_CLASS@", oracle_class)
        .replace("@ORACLE_ARGS@", oracle_args)
        .replace("@CALL_BLOCK@", call_block)
    )

    wrapper = job_root / "main.go"
    wrapper.write_text(
        WRAPPER_HEAD + "\n" + JSON_HELPER + "\n" + strip_package(code) + "\n" + main_source,
        encoding="utf-8",
    )
    wrapper.chmod(0o444)
    for name, content in provided_files:
        part_path = job_root / f"assembly_{name}"
        part_path.write_text(content, encoding="utf-8")
        part_path.chmod(0o444)

    executable = job_root / "solution"
    executor.compile(
        job_root,
        (executor.compiler_path, "build", "-trimpath", "-ldflags=-s -w", "-o", str(executable), str(wrapper),
         *[str(job_root / f"assembly_{name}") for name, _ in provided_files]),
        executable,
        {"PATH": "/usr/bin:/bin", "HOME": "/nonexistent", "TMPDIR": "/tmp", "LANG": "C.UTF-8", "GOCACHE": "/tmp/coderpuzzle-gocache", "GOPATH": "/tmp/gopath", "GOMODCACHE": "/tmp/gomodcache", "GOFLAGS": "-mod=mod", "GO111MODULE": "off"},
    )
    return PreparedProgram(
        command=(str(executable),),
        environment={"PATH": "/usr/bin:/bin", "HOME": "/nonexistent", "TMPDIR": str(scratch), "LANG": "C.UTF-8"},
    )
