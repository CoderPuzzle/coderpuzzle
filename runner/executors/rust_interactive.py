"""Rust wrapper generation for interactive problems.

Same contract as the C++ side (executors/cpp_interactive.py): one tagged
stream carries the whole case — a tagged value per oracle-construction
key, one per auxiliary method key, then the query budget. The wrapper
decodes them into an OjValue enum, converts auxiliary values to the
method's typed parameters with generated converters, and constructs the
problem-provided oracle (assembled into the same crate; its constructor
takes &[OjValue] slices plus the budget). Void methods are judged by the
oracle's verdict() OjValue.
"""
from __future__ import annotations

from pathlib import Path
import re
from typing import Any

from .base import ExecutorError, PreparedProgram
from .typed import rust_type, type_spec

WRAPPER_HEAD = """\
use std::io::Read as CoderPuzzleIoRead;

#[derive(Debug, Clone)]
pub enum OjValue {
    Null,
    Bool(bool),
    Int(i64),
    Double(f64),
    Str(String),
    Array(Vec<OjValue>),
    Object(Vec<(String, OjValue)>),
}

pub struct OjTaggedReader {
    bytes: Vec<u8>,
    position: usize,
}

impl OjTaggedReader {
    pub fn new(bytes: Vec<u8>) -> Self {
        OjTaggedReader { bytes, position: 0 }
    }
    fn byte(&mut self) -> Result<u8, String> {
        if self.position >= self.bytes.len() {
            return Err("Truncated case payload".to_string());
        }
        let value = self.bytes[self.position];
        self.position += 1;
        Ok(value)
    }
    fn u32(&mut self) -> Result<u32, String> {
        let mut value: u32 = 0;
        for _ in 0..4 {
            value = (value << 8) | self.byte()? as u32;
        }
        Ok(value)
    }
    fn i64(&mut self) -> Result<i64, String> {
        let mut value: u64 = 0;
        for _ in 0..8 {
            value = (value << 8) | self.byte()? as u64;
        }
        Ok(value as i64)
    }
    fn f64(&mut self) -> Result<f64, String> {
        let bits = self.i64()? as u64;
        Ok(f64::from_bits(bits))
    }
    fn str(&mut self) -> Result<String, String> {
        let length = self.u32()? as usize;
        let mut raw = Vec::with_capacity(length);
        for _ in 0..length {
            raw.push(self.byte()?);
        }
        Ok(String::from_utf8(raw).map_err(|_| "Invalid UTF-8 in case payload".to_string())?)
    }
    pub fn value(&mut self) -> Result<OjValue, String> {
        let tag = self.byte()?;
        match tag {
            0x00 => Ok(OjValue::Null),
            0x01 => Ok(OjValue::Bool(false)),
            0x02 => Ok(OjValue::Bool(true)),
            0x10 => Ok(OjValue::Int(self.u32()? as i32 as i64)),
            0x11 => Ok(OjValue::Int(self.i64()?)),
            0x12 => Ok(OjValue::Double(self.f64()?)),
            0x13 => Ok(OjValue::Str(self.str()?)),
            0x14 => {
                let count = self.u32()? as usize;
                let mut items = Vec::with_capacity(count);
                for _ in 0..count {
                    items.push(self.value()?);
                }
                Ok(OjValue::Array(items))
            }
            0x15 => {
                let count = self.u32()? as usize;
                let mut fields = Vec::with_capacity(count);
                for _ in 0..count {
                    let key = match self.value()? {
                        OjValue::Str(text) => text,
                        _ => return Err("Object keys must be strings".to_string()),
                    };
                    fields.push((key, self.value()?));
                }
                Ok(OjValue::Object(fields))
            }
            _ => Err("Unknown tagged value".to_string()),
        }
    }
}

fn coderpuzzle_json(value: &OjValue) -> String {
    match value {
        OjValue::Null => "null".to_string(),
        OjValue::Bool(v) => v.to_string(),
        OjValue::Int(v) => v.to_string(),
        OjValue::Double(v) => {
            if !v.is_finite() {
                panic!("Non-finite value");
            }
            format!("{}", v)
        }
        OjValue::Str(v) => {
            let mut out = String::with_capacity(v.len() + 2);
            out.push('"');
            for c in v.chars() {
                match c {
                    '"' => out.push_str("\\\\\\""),
                    '\\\\' => out.push_str("\\\\\\\\"),
                    c if (c as u32) < 0x20 => out.push_str(&format!("\\\\u{:04x}", c as u32)),
                    c => out.push(c),
                }
            }
            out.push('"');
            out
        }
        OjValue::Array(items) => {
            let parts: Vec<String> = items.iter().map(coderpuzzle_json).collect();
            format!("[{}]", parts.join(","))
        }
        OjValue::Object(fields) => {
            let parts: Vec<String> = fields
                .iter()
                .map(|(key, item)| format!("\\"{}\\":{}", key, coderpuzzle_json(item)))
                .collect();
            format!("{{{}}}", parts.join(","))
        }
    }
}

fn coderpuzzleEmit(line: &str) {
    use std::io::Write;
    use std::os::unix::io::FromRawFd;
    let mut channel = unsafe { std::fs::File::from_raw_fd(63) };
    if write!(channel, "{}\n", line).is_ok() {
        return;
    }
    println!("{}", line);
}

fn coderpuzzle_json_i32(value: i32) -> String { value.to_string() }
fn coderpuzzle_json_i64(value: i64) -> String { value.to_string() }
fn coderpuzzle_json_f64(value: f64) -> String {
    if !value.is_finite() {
        panic!("Non-finite return value");
    }
    format!("{}", value)
}
fn coderpuzzle_json_str(value: &str) -> String { coderpuzzle_json(&OjValue::Str(value.to_string())) }
fn coderpuzzle_json_bool(value: bool) -> String { value.to_string() }
"""

# Only emitted when the invocation actually uses a "nested" parameter or
# return value — NestedInteger is the bundle's own provided/rust/ type
# (docs/CODECS.md), not a judge-owned definition, so this helper must not
# reference it unconditionally.
NESTED_HELPERS = """\
// Builds NestedInteger from a JSON-shaped OjValue: an integer hold, or a
// list hold whose children recurse. Module-level item, so it resolves
// NestedInteger from the assembled provided/ source regardless of order.
fn coderpuzzle_nested_build(value: &OjValue) -> Result<NestedInteger, String> {
    match value {
        OjValue::Int(v) => i32::try_from(*v).map(NestedInteger::with_integer).map_err(|_| "Integer out of range".to_string()),
        OjValue::Array(items) => {
            let mut node = NestedInteger::new();
            for item in items {
                node.add(coderpuzzle_nested_build(item)?);
            }
            Ok(node)
        }
        _ => Err("Expected a nested list".to_string()),
    }
}
"""

MAIN_TEMPLATE = """\
fn coderpuzzle_run() -> Result<String, String> {
    let mut raw = Vec::new();
    std::io::stdin().read_to_end(&mut raw).map_err(|e| e.to_string())?;
    let mut tagged = OjTaggedReader::new(raw);
@VALUE_READS@
    let budget = match tagged.value()? {
        OjValue::Int(v) => v,
        _ => return Err("Budget must be an integer".to_string()),
    };
@CONVERT_LINES@
    let mut oracle = @ORACLE_CLASS@::new(&[@ORACLE_ARGS@], budget);
@CALL_BLOCK@
}

fn main() {
    let response = std::panic::catch_unwind(coderpuzzle_run);
    match response {
        Ok(Ok(actual)) => coderpuzzleEmit(&format!("__CODERPUZZLE_RESULT__{{\\"status\\":\\"completed\\",\\"actual\\":{}}}", actual)),
        Ok(Err(error)) => coderpuzzleEmit(&format!("__CODERPUZZLE_RESULT__{{\\"status\\":\\"runtime_error\\",\\"error\\":{}}}", coderpuzzle_json(&OjValue::Str(error)))),
        Err(_) => coderpuzzleEmit("__CODERPUZZLE_RESULT__{{\\"status\\":\\"runtime_error\\",\\"error\\":\\"Solution panicked\\"}}"),
    }
}
"""


def _rust_type(spec: dict[str, Any]) -> str:
    return rust_type(spec)


def _convert(spec: dict[str, Any], source: str) -> str:
    """Conversion expression turning a `&OjValue` (`source`) into the spec's
    Rust type. Matching a reference flips the default binding mode to by-ref,
    so `items` borrows and the `for item in items` loop hands the recursive
    call another `&OjValue` — any nesting depth works without moving out of
    the borrowed wrapper values."""
    kind = spec["kind"]
    if kind == "integer":
        bits = spec.get("bits", 32)
        target = "i64" if bits == 64 else "i32"
        return (
            f"(match {source} {{ OjValue::Int(v) => {target}::try_from(*v).map_err(|_| {{ \"Integer out of range\".to_string() }})?, "
            f"_ => return Err(\"Expected an integer\".to_string()) }})"
        )
    if kind == "number":
        return (
            f"(match {source} {{ OjValue::Double(v) => *v, OjValue::Int(v) => *v as f64, "
            f"_ => return Err(\"Expected a number\".to_string()) }})"
        )
    if kind == "boolean":
        return f"(match {source} {{ OjValue::Bool(v) => *v, _ => return Err(\"Expected a boolean\".to_string()) }})"
    if kind == "string":
        return (
            f"(match {source} {{ OjValue::Str(v) => v.clone(), _ => return Err(\"Expected a string\".to_string()) }})"
        )
    if kind == "array":
        inner = _convert(spec["items"], "item")
        return (
            f"(match {source} {{ OjValue::Array(items) => {{ let mut out: Vec<{_rust_type(spec['items'])}> = Vec::with_capacity(items.len()); "
            f"for item in items {{ out.push({inner}); }} out }}, "
            f"_ => return Err(\"Expected an array\".to_string()) }})"
        )
    if kind == "nested":
        return f"coderpuzzle_nested_build({source})?"
    raise ExecutorError(f"Interactive auxiliary type {kind} is not supported in Rust")


def _serialize(spec: dict[str, Any], source: str) -> str:
    """A Rust expression producing the tagged-JSON text for a return value
    of the spec's type. `source` must denote a &-borrow of the value (the
    generated code passes `&actual`), so items borrow through `.iter()` at
    any depth and the scalar leaves deref one level."""
    kind = spec["kind"]
    if kind == "integer":
        return f"coderpuzzle_json_i32(*{source})" if spec.get("bits", 32) == 32 else f"coderpuzzle_json_i64(*{source})"
    if kind == "number":
        return f"coderpuzzle_json_f64(*{source})"
    if kind == "boolean":
        return f"coderpuzzle_json_bool(*{source})"
    if kind == "string":
        return f"coderpuzzle_json_str({source})"
    if kind == "array":
        inner = _serialize(spec["items"], "coderpuzzle_item")
        return (
            f'(format!("[{{}}]", {{ let mut coderpuzzle_parts: Vec<String> = Vec::with_capacity(({source}).len()); '
            f"for coderpuzzle_item in ({source}).iter() {{ coderpuzzle_parts.push({inner}); }} "
            f'coderpuzzle_parts.join(",") }}))'
        )
    raise ExecutorError(f"Interactive return type {kind} is not supported in Rust")


def _rust_buffer_element(spec: dict[str, Any] | None) -> str:
    """The Vec element an out_buffer parameter allocates: bytes unless the
    parameter declares its own array value_type (mirrors go)."""
    if spec is None:
        return "u8"
    spec = type_spec(spec, "out_buffer")
    if spec["kind"] == "array":
        return _rust_type(spec["items"])
    raise ExecutorError("An out_buffer parameter needs an array value_type (or none, for bytes)")


def _buffer_value_expression(element: str, source: str) -> str:
    """A Rust expression wrapping one buffer entry into an OjValue."""
    if element == "String":
        return f"OjValue::Str({source}.clone())"
    if element == "u8":
        return f"OjValue::Int(i64::from(*{source}))"
    if element == "i64":
        return f"OjValue::Int(*{source})"
    if element == "bool":
        return f"OjValue::Bool(*{source})"
    if element == "f64":
        return f"OjValue::Double(*{source})"
    return f"OjValue::Int(i64::from(*{source}))"


def prepare_interactive(executor, job_root: Path, scratch: Path, code: str,
                        invocation: dict[str, Any], assembly) -> PreparedProgram:
    provided = (invocation.get("provided") or {}).get("oracle")
    if not provided:
        raise ExecutorError("Interactive problems must carry invocation.provided.oracle")
    oracle_class = provided.get("class")
    method = (invocation.get("entrypoints", {}) or {}).get("rust", invocation.get("method"))
    if not isinstance(method, str) or not method.isidentifier():
        raise ExecutorError("Invalid Rust entry point")
    construct_keys = list(provided.get("construct", ()))
    auxiliary_keys = list(provided.get("auxiliary", ()))
    parameters = invocation.get("parameters") or []
    # An out_buffer parameter allocates a buffer in its declared position:
    # it consumes no case input, and its capacity names the case key whose
    # decoded value sizes it (the read4 wire).
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
    specs = {
        parameter.get("name"): parameter.get("value_type")
        for parameter in parameters
        if isinstance(parameter, dict)
    }
    # Case key -> the raw decoded value holding its out_buffer capacity.
    capacity_sources = {
        **{key: index for index, key in enumerate(construct_keys)},
        **{key: len(construct_keys) + index for index, key in enumerate(auxiliary_keys)},
    }

    value_reads = "\n".join(
        f"    let coderpuzzle_value_{index} = tagged.value()?;" for index in range(len(construct_keys) + len(auxiliary_keys))
    )
    convert_lines = []
    auxiliary_args = []
    needs_nested = False
    for index, key in enumerate(auxiliary_keys):
        spec = specs.get(key)
        if spec is None:
            raise ExecutorError(f"Auxiliary key {key!r} has no invocation parameter type")
        spec = type_spec(spec, key)
        needs_nested = needs_nested or spec["kind"] == "nested"
        convert_lines.append(
            f"    let coderpuzzle_aux_{index}: {_rust_type(spec)} = {_convert(spec, f'&coderpuzzle_value_{len(construct_keys) + index}')};"
        )
        auxiliary_args.append(f"coderpuzzle_aux_{index}")

    buffer_variables: dict[int, tuple[str, str]] = {}
    for slot, capacity_key in buffer_slots.items():
        raw_index = capacity_sources.get(capacity_key)
        if raw_index is None:
            raise ExecutorError(f"out_buffer capacity_from {capacity_key!r} is not a case key")
        element = _rust_buffer_element(specs.get(parameters[slot].get("name")))
        default = {"String": "String::new()", "bool": "false", "f64": "0.0"}.get(element, "0")
        variable = f"coderpuzzle_buffer_{slot}"
        convert_lines.append(
            f"    let coderpuzzle_capacity_{slot}: i64 = match &coderpuzzle_value_{raw_index} {{ OjValue::Int(v) => *v, "
            f"_ => return Err(\"Buffer capacity must be an integer\".to_string()) }};\n"
            f"    let mut {variable}: Vec<{element}> = vec![{default}; coderpuzzle_capacity_{slot}.max(0) as usize];"
        )
        buffer_variables[slot] = (variable, element)

    parameter_arguments = []
    buffer_slot = None
    for index, parameter in enumerate(parameters):
        if index in buffer_variables:
            if buffer_slot is None:
                buffer_slot = index
            parameter_arguments.append(f"&mut {buffer_variables[index][0]}")
            continue
        if not isinstance(parameter, dict):
            raise ExecutorError("Every interactive parameter must be an object")
        name = parameter.get("name")
        if name not in capacity_sources:
            raise ExecutorError(f"Auxiliary key {name!r} has no case input")
        parameter_arguments.append(auxiliary_args.pop(0))

    oracle_args = ", ".join(
        f"coderpuzzle_value_{index}.clone()" for index in range(len(construct_keys))
    )
    call_arguments = ", ".join(["&mut oracle", *parameter_arguments])
    # A {"kind": "void"} return_type is a declared void, not a value: the
    # oracle's verdict() judges those (same rule as the python/java sides).
    has_return = bool(invocation.get("return_type")) and invocation["return_type"].get("kind") != "void"
    if has_return:
        # Serialize against the DECLARED return type — the wire mirrors the
        # other interactive wrappers' tagged-JSON, and hard-coding i32 here
        # broke every non-i32 return at compile time.
        return_spec = type_spec(invocation["return_type"], "Return value")
        if buffer_slot is None:
            call_block = (
                f"    let actual = Solution::{method}({call_arguments});\n"
                f"    Ok({_serialize(return_spec, '&actual')})"
            )
        else:
            buffer, element = buffer_variables[buffer_slot]
            call_block = (
                f"    let actual = Solution::{method}({call_arguments});\n"
                "    let coderpuzzle_count = i64::from(actual);\n"
                f"    let coderpuzzle_written = coderpuzzle_count.clamp(0, {buffer}.len() as i64) as usize;\n"
                f"    let coderpuzzle_entries: Vec<OjValue> = {buffer}.iter().take(coderpuzzle_written)\n"
                f"        .map(|coderpuzzle_item| {_buffer_value_expression(element, 'coderpuzzle_item')})\n"
                "        .collect();\n"
                "    Ok(coderpuzzle_json(&OjValue::Array(vec![OjValue::Int(coderpuzzle_count), OjValue::Array(coderpuzzle_entries)])))"
            )
    else:
        call_block = (
            f"    Solution::{method}({call_arguments});\n"
            '    Ok(coderpuzzle_json(&oracle.verdict()))'
        )

    provided_source = "".join(
        content + "\n"
        for _, content in sorted((assembly or {}).get("provided", {}).items())
        if _.endswith(".rs")
    )
    # The bank's Rust submissions are `impl Solution` blocks without a
    # struct declaration; the wrapper owns the unit struct.
    code = re.sub(r"^\s*pub struct Solution;\s*$\n?", "", code, flags=re.M)
    code = "pub struct Solution;\n" + code
    main_source = (
        MAIN_TEMPLATE
        .replace("@VALUE_READS@", value_reads)
        .replace("@CONVERT_LINES@", "\n".join(convert_lines))
        .replace("@ORACLE_CLASS@", oracle_class)
        .replace("@ORACLE_ARGS@", oracle_args)
        .replace("@CALL_BLOCK@", call_block)
    )
    source = (
        WRAPPER_HEAD + "\n"
        + (NESTED_HELPERS + "\n" if needs_nested else "")
        + provided_source + code + "\n" + main_source
    )
    source_path = job_root / "main.rs"
    executable = job_root / "solution"
    source_path.write_text(source, encoding="utf-8")
    source_path.chmod(0o444)
    executor.compile(
        job_root,
        (executor.compiler_path, "--edition=2021", "-C", "opt-level=2", "-C", "debuginfo=0",
         "-o", str(executable), str(source_path)),
        executable,
        {"PATH": "/usr/bin:/bin", "HOME": "/nonexistent", "TMPDIR": "/tmp", "LANG": "C.UTF-8"},
    )
    return PreparedProgram(
        command=(str(executable),),
        environment={"PATH": "/usr/bin:/bin", "HOME": "/nonexistent", "TMPDIR": str(scratch), "LANG": "C.UTF-8"},
    )
