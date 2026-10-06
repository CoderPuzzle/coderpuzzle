"""C++ wrapper generation for interactive problems.

One tagged stream carries the whole case (see executors/typed.py): a
tagged generic value per oracle-construction key, then one per auxiliary
method key, then the query budget. The wrapper decodes them into OjValue,
converts the auxiliary values to the method's typed parameters with
generated converters (specs known at generation time), constructs the
problem-provided oracle class — compiled alongside via assembly; its
constructor takes the OjValues then the budget — and calls the solution
method. A parameter may declare an out_buffer: the wrapper allocates the
array the solution writes into (element type from the parameter's
value_type, chars by default; capacity taken from another parameter's
already-decoded value), the case input for that position stays empty, and
the emitted result becomes [count, entries...] — the filled prefix, the
read4 wire. Void methods are judged by the oracle's verdict() OjValue.
"""
from __future__ import annotations

from pathlib import Path
from typing import Any

from .base import ExecutorError, PreparedProgram
from .typed import type_spec

WRAPPER_HEAD = """\
#include <bits/stdc++.h>
#include <unistd.h>
using namespace std;

void coderpuzzleEmit(const std::string& line) {
    std::string payload = line + "\\n";
    if (::write(63, payload.data(), payload.size()) < 0) {
        std::cout << payload << std::flush;
    }
}

struct OjValue {
    enum Kind { Null, Bool, Int, Double, String, Array, Object } kind = Null;
    bool boolean = false;
    long long integer = 0;
    double real = 0.0;
    std::string text;
    std::vector<OjValue> items;
    std::vector<std::pair<std::string, OjValue>> fields;
};

struct OjTaggedReader {
    std::vector<unsigned char> bytes;
    size_t position = 0;
    unsigned char byte() {
        if (position >= bytes.size()) throw std::runtime_error("Truncated case payload");
        return bytes[position++];
    }
    unsigned u32() {
        unsigned value = 0;
        for (int i = 0; i < 4; ++i) value = (value << 8) | byte();
        return value;
    }
    long long i64() {
        unsigned long long value = 0;
        for (int i = 0; i < 8; ++i) value = (value << 8) | byte();
        return static_cast<long long>(value);
    }
    double f64() {
        unsigned long long bits = static_cast<unsigned long long>(i64());
        double value;
        std::memcpy(&value, &bits, sizeof value);
        return value;
    }
    std::string str() {
        std::string value(u32(), '\\0');
        for (auto& c : value) c = static_cast<char>(byte());
        return value;
    }
    OjValue value() {
        OjValue out;
        unsigned char tag = byte();
        switch (tag) {
            case 0x00: out.kind = OjValue::Null; break;
            case 0x01: out.kind = OjValue::Bool; out.boolean = false; break;
            case 0x02: out.kind = OjValue::Bool; out.boolean = true; break;
            case 0x10: {
                unsigned v = u32();
                out.kind = OjValue::Int;
                out.integer = static_cast<int32_t>(v);
                break;
            }
            case 0x11: out.kind = OjValue::Int; out.integer = i64(); break;
            case 0x12: out.kind = OjValue::Double; out.real = f64(); break;
            case 0x13: out.kind = OjValue::String; out.text = str(); break;
            case 0x14: {
                out.kind = OjValue::Array;
                unsigned count = u32();
                out.items.reserve(count);
                for (unsigned i = 0; i < count; ++i) out.items.push_back(value());
                break;
            }
            case 0x15: {
                out.kind = OjValue::Object;
                unsigned count = u32();
                out.fields.reserve(count);
                for (unsigned i = 0; i < count; ++i) {
                    OjValue key = value();
                    OjValue item = value();
                    out.fields.emplace_back(key.text, item);
                }
                break;
            }
            default: throw std::runtime_error("Unknown tagged value");
        }
        return out;
    }
    long long position_() const { return static_cast<long long>(position); }
};

static std::string coderpuzzle_json_string(const std::string& text) {
    std::ostringstream out;
    out << '"';
    for (unsigned char c : text) {
        if (c == '"' || c == '\\\\') out << '\\\\' << c;
        else if (c < 0x20) {
            static const char* hex = "0123456789abcdef";
            out << "\\\\u00" << hex[c >> 4] << hex[c & 15];
        } else out << c;
    }
    out << '"';
    return out.str();
}

static std::string coderpuzzle_json(const OjValue& value) {
    std::ostringstream out;
    switch (value.kind) {
        case OjValue::Null: out << "null"; break;
        case OjValue::Bool: out << (value.boolean ? "true" : "false"); break;
        case OjValue::Int: out << value.integer; break;
        case OjValue::Double:
            if (!std::isfinite(value.real)) throw std::runtime_error("Non-finite value");
            out << std::setprecision(17) << value.real;
            break;
        case OjValue::String:
            out << coderpuzzle_json_string(value.text);
            break;
        case OjValue::Array: {
            out << '[';
            for (size_t i = 0; i < value.items.size(); ++i) {
                if (i) out << ',';
                out << coderpuzzle_json(value.items[i]);
            }
            out << ']';
            break;
        }
        case OjValue::Object: {
            out << '{';
            for (size_t i = 0; i < value.fields.size(); ++i) {
                if (i) out << ',';
                out << coderpuzzle_json_string(value.fields[i].first) << ':' << coderpuzzle_json(value.fields[i].second);
            }
            out << '}';
            break;
        }
    }
    return out.str();
}

static std::string coderpuzzle_json(long long value) { return coderpuzzle_json(OjValue{OjValue::Int, false, value, 0, "", {}, {}}); }
static std::string coderpuzzle_json(int value) { return coderpuzzle_json(static_cast<long long>(value)); }
static std::string coderpuzzle_json(double value) {
    if (!std::isfinite(value)) throw std::runtime_error("Non-finite return value");
    OjValue v; v.kind = OjValue::Double; v.real = value;
    return coderpuzzle_json(v);
}
static std::string coderpuzzle_json(const std::string& value) {
    OjValue v; v.kind = OjValue::String; v.text = value;
    return coderpuzzle_json(v);
}
static std::string coderpuzzle_json(bool value) {
    OjValue v; v.kind = OjValue::Bool; v.boolean = value;
    return coderpuzzle_json(v);
}
template <typename T> static std::string coderpuzzle_json(const std::vector<T>& values) {
    std::string output = "[";
    for (size_t index = 0; index < values.size(); ++index) {
        if (index) output += ',';
        output += coderpuzzle_json(values[index]);
    }
    return output + "]";
}
"""

MAIN_TEMPLATE = """\
int main() {
    try {
        std::vector<unsigned char> bytes{
            std::istreambuf_iterator<char>(std::cin), std::istreambuf_iterator<char>()
        };
        OjTaggedReader tagged{std::move(bytes)};
@VALUE_READS@
        OjValue coderpuzzle_budget_value = tagged.value();
        if (coderpuzzle_budget_value.kind != OjValue::Int) throw std::runtime_error("Budget must be an integer");
        long long coderpuzzle_budget = coderpuzzle_budget_value.integer;
@CONVERT_LINES@
        @CLASS_NAME@ coderpuzzle_solution;
        @ORACLE_CLASS@ coderpuzzle_oracle(@ORACLE_ARGS@);
@CALL_BLOCK@
    } catch (const std::exception& error) {
        coderpuzzleEmit(std::string("__CODERPUZZLE_RESULT__{\\"status\\":\\"runtime_error\\",\\"error\\":") + coderpuzzle_json(std::string(error.what())) + "}");
    } catch (...) {
        coderpuzzleEmit("__CODERPUZZLE_RESULT__{\\"status\\":\\"runtime_error\\",\\"error\\":\\"Unknown C++ exception\\"}");
    }
    return 0;
}
"""


def _cpp_type(spec: dict[str, Any]) -> str:
    kind = spec["kind"]
    if kind == "integer":
        return "long long" if spec.get("bits", 32) == 64 else "int"
    if kind == "number":
        return "double"
    if kind == "boolean":
        return "bool"
    if kind == "string":
        return "std::string"
    if kind == "array":
        return f"std::vector<{_cpp_type(spec['items'])}>"
    if kind == "nested":
        return "NestedInteger"
    raise ExecutorError(f"Interactive auxiliary type {kind} is not supported in C++")


def _convert(spec: dict[str, Any], source: str) -> str:
    """A C++ expression converting an OjValue to the typed parameter."""
    kind = spec["kind"]
    if kind == "integer":
        bits = spec.get("bits", 32)
        return f"[&](const OjValue& v) {{ if (v.kind != OjValue::Int) throw std::runtime_error(\"Expected an integer\"); return {'(long long)' if bits == 64 else 'static_cast<int>'} (v.integer); }}({source})"
    if kind == "number":
        return f"[&](const OjValue& v) {{ if (v.kind != OjValue::Double && v.kind != OjValue::Int) throw std::runtime_error(\"Expected a number\"); return v.kind == OjValue::Double ? v.real : (double)v.integer; }}({source})"
    if kind == "boolean":
        return f"[&](const OjValue& v) {{ if (v.kind != OjValue::Bool) throw std::runtime_error(\"Expected a boolean\"); return v.boolean; }}({source})"
    if kind == "string":
        return f"[&](const OjValue& v) {{ if (v.kind != OjValue::String) throw std::runtime_error(\"Expected a string\"); return v.text; }}({source})"
    if kind == "array":
        inner = _convert(spec["items"], "item")
        return (
            f"[&](const OjValue& v) {{ if (v.kind != OjValue::Array) throw std::runtime_error(\"Expected an array\"); "
            f"std::vector<{_cpp_type(spec['items'])}> out; out.reserve(v.items.size()); "
            f"for (const auto& item : v.items) out.push_back({inner}); return out; }}({source})"
        )
    if kind == "nested":
        # Self-passing generic lambda: runtime recursion over the nested
        # JSON without a generation-time recursive _convert call. Emitted
        # in main, after the bundle-provided source declares NestedInteger.
        return (
            f"[&](const OjValue& v) {{ auto coderpuzzle_build = [&](auto&& coderpuzzle_build, const OjValue& v) -> NestedInteger {{ "
            f"if (v.kind == OjValue::Int) return NestedInteger((long long)v.integer); "
            f"if (v.kind != OjValue::Array) throw std::runtime_error(\"Expected a nested list\"); "
            f"NestedInteger node; for (const auto& item : v.items) node.add(coderpuzzle_build(coderpuzzle_build, item)); return node; }}; "
            f"return coderpuzzle_build(coderpuzzle_build, v); }}({source})"
        )
    raise ExecutorError(f"Interactive auxiliary type {kind} is not supported in C++")


def _cpp_buffer_element(spec: Any) -> str:
    """The array type an out_buffer parameter allocates: chars unless the
    parameter declares its own array value_type."""
    if spec is None:
        return "char"
    spec = type_spec(spec, "out_buffer")
    if spec["kind"] == "array":
        return _cpp_type(spec["items"])
    raise ExecutorError("An out_buffer parameter needs an array value_type (or none, for chars)")


def _cpp_entry_json(element: str, variable: str) -> str:
    """A JSON expression for one captured buffer entry. Chars serialize as
    1-char strings (java's String.valueOf(char)); the integral overloads of
    coderpuzzle_json would otherwise swallow the char as a number."""
    if element == "char":
        return f"coderpuzzle_json(std::string(1, {variable}))"
    return f"coderpuzzle_json({variable})"


def prepare_interactive(executor, job_root: Path, scratch: Path, code: str,
                        invocation: dict[str, Any], assembly) -> PreparedProgram:
    provided = (invocation.get("provided") or {}).get("oracle")
    if not provided:
        raise ExecutorError("Interactive problems must carry invocation.provided.oracle")
    oracle_class = provided.get("class")
    method = (invocation.get("entrypoints", {}) or {}).get("cpp", invocation.get("method"))
    if not isinstance(method, str) or not method.isidentifier():
        raise ExecutorError("Invalid C++ entry point")
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

    value_reads = []
    for index in range(len(construct_keys) + len(auxiliary_keys)):
        value_reads.append(f"        OjValue coderpuzzle_value_{index} = tagged.value();")
    convert_lines = []
    # Case key -> a long long expression for its already-decoded value; an
    # out_buffer capacity may name any decoded key.
    capacity_sources: dict[str, str] = {}
    for index, key in enumerate(construct_keys):
        capacity_sources[key] = (
            "[&](const OjValue& v) { if (v.kind != OjValue::Int) "
            "throw std::runtime_error(\"Expected an integer\"); return v.integer; }"
            f"(coderpuzzle_value_{index})"
        )
    auxiliary_variables: dict[str, str] = {}
    for index, key in enumerate(auxiliary_keys):
        spec = specs.get(key)
        if spec is None:
            raise ExecutorError(f"Auxiliary key {key!r} has no invocation parameter type")
        spec = type_spec(spec, key)
        variable = f"coderpuzzle_aux_{index}"
        convert_lines.append(
            f"        {_cpp_type(spec)} {variable} = {_convert(spec, f'coderpuzzle_value_{len(construct_keys) + index}')};"
        )
        auxiliary_variables[key] = variable
        capacity_sources[key] = f"static_cast<long long>({variable})"

    buffer_variables: dict[int, str] = {}
    buffer_elements: dict[int, str] = {}
    for slot, capacity_key in buffer_slots.items():
        capacity = capacity_sources.get(capacity_key)
        if capacity is None:
            raise ExecutorError(f"out_buffer capacity_from {capacity_key!r} is not a case key")
        element = _cpp_buffer_element(specs.get(parameters[slot].get("name")))
        variable = f"coderpuzzle_buffer_{slot}"
        convert_lines.append(
            f"        std::vector<{element}> {variable}(static_cast<size_t>(std::max({capacity}, 0LL)));"
        )
        buffer_variables[slot] = variable
        buffer_elements[slot] = element

    parameter_arguments = []
    buffer_slot = None
    for index, parameter in enumerate(parameters):
        if index in buffer_variables:
            if buffer_slot is None:
                buffer_slot = index
            parameter_arguments.append(buffer_variables[index])
        else:
            if not isinstance(parameter, dict):
                raise ExecutorError("Every interactive parameter must be an object")
            parameter_arguments.append(auxiliary_variables[parameter.get("name")])

    oracle_args = ", ".join(
        [f"coderpuzzle_value_{index}" for index in range(len(construct_keys))] + ["coderpuzzle_budget"]
    )
    call_arguments = ", ".join(["coderpuzzle_oracle", *parameter_arguments])
    # A {"kind": "void"} return_type is a declared void, not a value: the
    # oracle's verdict() judges those (same rule as the python/java sides).
    if invocation.get("return_type") and invocation["return_type"].get("kind") != "void":
        if buffer_slot is None:
            call_block = (
                f"auto coderpuzzle_actual = coderpuzzle_solution.{method}({call_arguments});\n"
                '        coderpuzzleEmit("__CODERPUZZLE_RESULT__{\\"status\\":\\"completed\\",\\"actual\\":" + coderpuzzle_json(coderpuzzle_actual) + "}");'
            )
        else:
            buffer = buffer_variables[buffer_slot]
            call_block = (
                f"auto coderpuzzle_actual = coderpuzzle_solution.{method}({call_arguments});\n"
                "        long long coderpuzzle_count = static_cast<long long>(coderpuzzle_actual);\n"
                f"        long long coderpuzzle_written = std::max(0LL, std::min(coderpuzzle_count, static_cast<long long>({buffer}.size())));\n"
                '        std::string coderpuzzle_entries = "[";\n'
                "        for (long long coderpuzzle_index = 0; coderpuzzle_index < coderpuzzle_written; ++coderpuzzle_index) {\n"
                "            if (coderpuzzle_index != 0) coderpuzzle_entries += \",\";\n"
                f"            coderpuzzle_entries += {_cpp_entry_json(buffer_elements[buffer_slot], f'{buffer}[coderpuzzle_index]')};\n"
                "        }\n"
                '        coderpuzzle_entries += "]";\n'
                '        coderpuzzleEmit("__CODERPUZZLE_RESULT__{\\"status\\":\\"completed\\",\\"actual\\":[" + coderpuzzle_json(coderpuzzle_count) + "," + coderpuzzle_entries + "]}");'
            )
    else:
        call_block = (
            f"coderpuzzle_solution.{method}({call_arguments});\n"
            '        coderpuzzleEmit("__CODERPUZZLE_RESULT__{\\"status\\":\\"completed\\",\\"actual\\":" + coderpuzzle_json(coderpuzzle_oracle.verdict()) + "}");'
        )

    provided_source = "".join(
        content + "\n"
        for _, content in sorted((assembly or {}).get("provided", {}).items())
        if _.endswith((".hpp", ".cpp", ".h"))
    )
    main_source = (
        MAIN_TEMPLATE
        .replace("@VALUE_READS@", "\n".join(value_reads))
        .replace("@CONVERT_LINES@", "\n".join(convert_lines))
        .replace("@CLASS_NAME@", invocation.get("class_name", "Solution"))
        .replace("@ORACLE_CLASS@", oracle_class)
        .replace("@ORACLE_ARGS@", oracle_args)
        .replace("@CALL_BLOCK@", call_block)
    )
    source = WRAPPER_HEAD + "\n" + provided_source + code + "\n" + main_source
    source_path = job_root / "main.cpp"
    executable = job_root / "solution"
    source_path.write_text(source, encoding="utf-8")
    source_path.chmod(0o444)
    executor.compile(
        job_root,
        (executor.compiler_path, "-std=c++20", "-O2", "-o", str(executable), str(source_path)),
        executable,
        {"PATH": "/usr/bin:/bin", "HOME": "/nonexistent", "TMPDIR": "/tmp", "LANG": "C.UTF-8"},
    )
    return PreparedProgram(
        command=(str(executable),),
        environment={"PATH": "/usr/bin:/bin", "HOME": "/nonexistent", "TMPDIR": str(scratch), "LANG": "C.UTF-8"},
    )
