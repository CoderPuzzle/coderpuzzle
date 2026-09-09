"""Design-kind wrapper generation for C++.

Same protocol as js_design.py (reference: python_harness._invoke_design):
actions + params, instance from params[0] (plus {"new": handle}
actions for further named instances, LC 1570's two-object wire), $prev
piping, randomized actions as frequency tables. The case travels as one
tagged stream. The
wrapper decodes into OjValue and replays through a generated dispatch
switch calling typed methods, with per-spec converters identical to the
interactive module's.
"""
from __future__ import annotations

from pathlib import Path
from typing import Any

from .base import ExecutorError, PreparedProgram
from .typed import type_spec
from .cpp_interactive import WRAPPER_HEAD, _cpp_type, _convert

TREE_HELPERS = """\
// Level-order OjValue array (nulls for absent children) -> TreeNode*,
// same slot-to-node assignment as the harness's tree_node codec.
static TreeNode* coderpuzzle_tree_from(const OjValue& value) {
    if (value.kind != OjValue::Array) throw std::runtime_error("Expected a level-order tree array");
    const std::vector<OjValue>& slots = value.items;
    if (slots.empty() || slots[0].kind == OjValue::Null) return nullptr;
    std::vector<TreeNode*> nodes;
    nodes.reserve(slots.size());
    for (const OjValue& slot : slots) {
        if (slot.kind == OjValue::Null) {
            nodes.push_back(nullptr);
            continue;
        }
        if (slot.kind != OjValue::Int) throw std::runtime_error("Tree slots must be integers");
        nodes.push_back(new TreeNode(static_cast<int>(slot.integer)));
    }
    std::deque<TreeNode*> queue{nodes[0]};
    std::size_t index = 1;
    while (!queue.empty() && index < nodes.size()) {
        TreeNode* node = queue.front();
        queue.pop_front();
        if (index < nodes.size()) {
            node->left = nodes[index++];
            if (node->left != nullptr) queue.push_back(node->left);
        }
        if (index < nodes.size()) {
            node->right = nodes[index++];
            if (node->right != nullptr) queue.push_back(node->right);
        }
    }
    return nodes[0];
}

// TreeNode* -> level-order OjValue array, trailing nulls trimmed.
static OjValue oj_from_tree(const TreeNode* root) {
    OjValue output;
    output.kind = OjValue::Array;
    std::deque<const TreeNode*> queue;
    if (root != nullptr) queue.push_back(root);
    while (!queue.empty()) {
        const TreeNode* node = queue.front();
        queue.pop_front();
        if (node == nullptr) {
            output.items.push_back(OjValue());
            continue;
        }
        OjValue slot;
        slot.kind = OjValue::Int;
        slot.integer = node->val;
        output.items.push_back(slot);
        queue.push_back(node->left);
        queue.push_back(node->right);
    }
    while (!output.items.empty() && output.items.back().kind == OjValue::Null) {
        output.items.pop_back();
    }
    return output;
}
"""


def _design_type(spec: dict[str, Any]) -> str:
    """Declared parameter type for the design replay: the interactive
    module's names plus the tree codec's TreeNode*."""
    if spec["kind"] == "binary_tree":
        return "TreeNode*"
    return _cpp_type(spec)


def _design_convert(spec: dict[str, Any], source: str) -> str:
    """Parameter conversion for the design replay: like the interactive
    converter, plus the tree_node codec's level-order array -> TreeNode*."""
    if spec["kind"] == "binary_tree":
        return f"coderpuzzle_tree_from({source})"
    return _convert(spec, source)


MAIN_TEMPLATE = """\
int main() {
    try {
        std::vector<unsigned char> bytes{
            std::istreambuf_iterator<char>(std::cin), std::istreambuf_iterator<char>()
        };
        OjTaggedReader tagged{std::move(bytes)};
        OjValue actions_value = tagged.value();
        OjValue params_value = tagged.value();
        if (actions_value.kind != OjValue::Array || params_value.kind != OjValue::Array
            || actions_value.items.size() != params_value.items.size()
            || actions_value.items.empty()) {
            throw std::runtime_error("Design input requires equally sized actions and params");
        }
        const std::vector<OjValue>& actions = actions_value.items;
        const std::vector<OjValue>& params = params_value.items;
        std::vector<OjValue> constructor_row = params[0].kind == OjValue::Array ? params[0].items : std::vector<OjValue>{};
        @CLASS_NAME@* solution = coderpuzzle_construct_@CLASS_NAME@(constructor_row);
        // Named instances ({"new": handle} actions) live here for the whole
        // replay; $ref arguments and "on" targets resolve through it. The
        // primary instance from params[0] is registered when actions[0]
        // names it, and stays the default target otherwise.
        std::map<std::string, @CLASS_NAME@*> instances;
        if (actions[0].kind == OjValue::Object) {
            for (const auto& field : actions[0].fields) {
                if (field.first == "new" && field.second.kind == OjValue::String) {
                    if (field.second.text.empty() || instances.count(field.second.text)) {
                        throw std::runtime_error("Duplicate or invalid design instance handle: " + field.second.text);
                    }
                    instances[field.second.text] = solution;
                }
            }
        }
        std::vector<OjValue> outputs;
        outputs.push_back(OjValue());
        OjValue previous;
        for (size_t step = 1; step < actions.size(); ++step) {
            // A {"new": handle} action constructs another instance of the
            // design class from this step's params row; constructors return
            // nothing, so the recorded slot is null.
            if (actions[step].kind == OjValue::Object) {
                bool is_new = false;
                std::string new_handle;
                for (const auto& field : actions[step].fields) {
                    if (field.first == "new") {
                        is_new = true;
                        if (field.second.kind == OjValue::String) new_handle = field.second.text;
                    }
                }
                if (is_new) {
                    if (new_handle.empty() || instances.count(new_handle)) {
                        throw std::runtime_error("Duplicate or invalid design instance handle: " + new_handle);
                    }
                    std::vector<OjValue> row = params[step].kind == OjValue::Array ? params[step].items : std::vector<OjValue>{};
                    instances[new_handle] = coderpuzzle_construct_@CLASS_NAME@(row);
                    outputs.push_back(OjValue());
                    previous = OjValue();
                    continue;
                }
            }
            std::string name;
            long long repeat = 1;
            std::string on_handle;
            bool has_on = false;
            if (actions[step].kind == OjValue::Object) {
                for (const auto& field : actions[step].fields) {
                    if (field.first == "call" && field.second.kind == OjValue::String) name = field.second.text;
                    if (field.first == "repeat" && field.second.kind == OjValue::Int) repeat = field.second.integer;
                    if (field.first == "on" && field.second.kind == OjValue::String) { on_handle = field.second.text; has_on = true; }
                }
            } else if (actions[step].kind == OjValue::String) {
                name = actions[step].text;
            } else {
                throw std::runtime_error("Design action must be a string");
            }
            @CLASS_NAME@* target = solution;
            if (has_on) {
                auto found = instances.find(on_handle);
                if (found == instances.end()) {
                    throw std::runtime_error("Unknown design instance handle: " + on_handle);
                }
                target = found->second;
            }
            std::vector<OjValue> raw_arguments = params[step].kind == OjValue::Array ? params[step].items : std::vector<OjValue>{};
            std::vector<OjValue> call_arguments;
            call_arguments.reserve(raw_arguments.size());
            // Live instances ride this parallel slot vector: a {"$ref":
            // handle} argument resolves to its pointer here, and the
            // dispatch reads it through the null-guarded helper instead of
            // converting the wire object.
            std::vector<@CLASS_NAME@*> instance_arguments(raw_arguments.size(), nullptr);
            for (size_t slot = 0; slot < raw_arguments.size(); ++slot) {
                const OjValue& argument = raw_arguments[slot];
                if (argument.kind == OjValue::Object && argument.fields.size() == 1
                    && argument.fields[0].first == "$prev") {
                    call_arguments.push_back(previous);
                } else if (argument.kind == OjValue::Object && argument.fields.size() == 1
                    && argument.fields[0].first == "$ref") {
                    auto found = instances.find(argument.fields[0].second.text);
                    if (found == instances.end()) {
                        throw std::runtime_error("Unknown design instance handle: " + argument.fields[0].second.text);
                    }
                    instance_arguments[slot] = found->second;
                    call_arguments.push_back(argument);
                } else {
                    call_arguments.push_back(argument);
                }
            }
            if (repeat > 1) {
                std::map<std::string, long long> frequencies;
                OjValue last;
                for (long long trial = 0; trial < repeat; ++trial) {
                    OjValue result = dispatch@CLASS_NAME@(*target, name, call_arguments, instance_arguments);
                    frequencies[coderpuzzle_json(result)] += 1;
                    last = result;
                }
                OjValue table;
                table.kind = OjValue::Object;
                for (const auto& entry : frequencies) {
                    OjValue count;
                    count.kind = OjValue::Int;
                    count.integer = entry.second;
                    table.fields.emplace_back(entry.first, count);
                }
                outputs.push_back(table);
                // $prev carries the last raw result, not the frequency table
                // (python_harness pipes raw_output).
                previous = last;
            } else {
                OjValue result = dispatch@CLASS_NAME@(*target, name, call_arguments, instance_arguments);
                outputs.push_back(result);
                previous = result;
            }
        }
        coderpuzzleEmit("__CODERPUZZLE_RESULT__{\\"status\\":\\"completed\\",\\"actual\\":" + coderpuzzle_json(outputs) + "}");
    } catch (const std::exception& error) {
        coderpuzzleEmit(std::string("__CODERPUZZLE_RESULT__{\\"status\\":\\"runtime_error\\",\\"error\\":") + coderpuzzle_json(std::string(error.what())) + "}");
    } catch (...) {
        coderpuzzleEmit("__CODERPUZZLE_RESULT__{\\"status\\":\\"runtime_error\\",\\"error\\":\\"Unknown C++ exception\\"}");
    }
    return 0;
}
"""


def prepare_design(executor, job_root: Path, scratch: Path, code: str,
                   invocation: dict[str, Any], assembly) -> PreparedProgram:
    class_name = invocation.get("class_name", "Solution")
    if not isinstance(class_name, str) or not class_name.isidentifier():
        raise ExecutorError("Invalid design entry class")
    entrypoints = invocation.get("entrypoints") or {}
    constructor = invocation.get("constructor", {}).get("parameters", [])
    constructor_specs = [
        type_spec(p.get("value_type"), f"Constructor parameter {index + 1}")
        for index, p in enumerate(constructor)
    ]

    constructor_convert = []
    for index, spec in enumerate(constructor_specs):
        constructor_convert.append(
            f"        {_design_type(spec)} coderpuzzle_ctor_{index} = {_design_convert(spec, f'row[{index}]')};"
        )
    constructor_args = ", ".join(f"coderpuzzle_ctor_{index}" for index in range(len(constructor_specs)))
    # Construction is one generated helper so params[0] and any {"new":
    # handle} action build instances through the same conversion.
    constructor_helper = (
        f"static {class_name}* coderpuzzle_construct_{class_name}(const std::vector<OjValue>& row) {{\n"
        + "\n".join(constructor_convert)
        + f"\n    return new {class_name}({constructor_args});\n}}\n"
        # Null-guarded live-instance handover: instance parameters ride the
        # parallel pointer vector main fills from {"$ref": handle} markers.
        + f"\nstatic {class_name}& coderpuzzle_instance_{class_name}({class_name}* pointer) {{\n"
        + '    if (pointer == nullptr) {\n'
        + '        throw std::runtime_error("Parameter must be a {\\"$ref\\": handle} instance reference");\n'
        + "    }\n"
        + "    return *pointer;\n}\n"
    )

    needs_tree = any(spec["kind"] == "binary_tree" for spec in constructor_specs)
    dispatch_cases = []
    for method in invocation.get("methods", []):
        name = method.get("name")
        cpp_name = entrypoints.get(f"cpp.{name}", name)
        specs = [
            type_spec(p.get("value_type"), f"{name} parameter {index + 1}")
            for index, p in enumerate(method.get("parameters", []))
        ]
        needs_tree = needs_tree or any(spec["kind"] == "binary_tree" for spec in specs)
        args = ", ".join(
            f"coderpuzzle_instance_{class_name}(instance_arguments[{index}])"
            if spec["kind"] == "instance"
            else _design_convert(spec, f"call_arguments[{index}]")
            for index, spec in enumerate(specs)
        )
        returns = method.get("return_type")
        is_void = returns is None or returns.get("kind") == "void"
        is_tree = returns is not None and returns.get("kind") == "binary_tree"
        needs_tree = needs_tree or is_tree
        call = f"solution.{cpp_name}({args})"
        result_expr = f"oj_from_tree({call})" if is_tree else f"oj_from({call})"
        dispatch_cases.append(
            f'        if (name == "{name}") {{ '
            + (f"return {result_expr};" if not is_void else f"{call}; return OjValue();")
            + " }"
        )
    dispatch = (
        f"static OjValue dispatch{class_name}({class_name}& solution, const std::string& name, "
        f"const std::vector<OjValue>& call_arguments, const std::vector<{class_name}*>& instance_arguments) {{\n"
        + "\n".join(dispatch_cases)
        + f'\n            throw std::runtime_error("Unknown design method: " + name);\n        }}\n'
    )

    provided_source = "".join(
        content + "\n"
        for _, content in sorted((assembly or {}).get("provided", {}).items())
        if _.endswith((".hpp", ".cpp", ".h"))
    )
    # oj_from converts supported typed returns into OjValue.
    oj_from = """
static OjValue oj_from(long long value) { OjValue v; v.kind = OjValue::Int; v.integer = value; return v; }
static OjValue oj_from(int value) { OjValue v; v.kind = OjValue::Int; v.integer = value; return v; }
static OjValue oj_from(double value) { OjValue v; v.kind = OjValue::Double; v.real = value; return v; }
static OjValue oj_from(bool value) { OjValue v; v.kind = OjValue::Bool; v.boolean = value; return v; }
static OjValue oj_from(const std::string& value) { OjValue v; v.kind = OjValue::String; v.text = value; return v; }
template <typename T> static OjValue oj_from(const std::vector<T>& values) {
    OjValue v; v.kind = OjValue::Array; v.items.reserve(values.size());
    for (const T& item : values) v.items.push_back(oj_from(item));
    return v;
}
"""

    source = (
        WRAPPER_HEAD + "\n" + "#include <map>\n"
        + oj_from + "\n"
        + provided_source + (TREE_HELPERS + "\n" if needs_tree else "")
        + code + "\n"
        + constructor_helper + "\n"
        + dispatch + "\n"
        + MAIN_TEMPLATE.replace("@CLASS_NAME@", class_name)
    )
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
