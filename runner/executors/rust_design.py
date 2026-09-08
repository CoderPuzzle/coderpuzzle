"""Design-kind wrapper generation for Rust.

Same protocol as js_design.py (reference: python_harness._invoke_design):
actions + params, instance from params[0] (plus {"new": handle}
actions for further named instances, LC 1570's two-object wire), $prev
piping, randomized actions as frequency tables. The case travels as one
tagged stream. The
wrapper decodes into the OjValue enum and replays through a generated
dispatch match calling typed methods, with per-spec converters identical
to the interactive module's. The submission's design class is a plain
struct with an inherent `new` constructor; the wrapper constructs it
from converted row values.
"""
from __future__ import annotations

import re
from pathlib import Path
from typing import Any

from .base import ExecutorError, PreparedProgram
from .typed import rust_type, type_spec
from .rust_interactive import NESTED_HELPERS, WRAPPER_HEAD, _convert, _rust_type

TREE_HELPERS = """\
// tree_node codec decode: level-order OjValue array (Null for absent
// children) -> owned tree, same slot-to-node assignment as the harness.
fn coderpuzzle_design_tree(value: &OjValue) -> Result<Option<Box<TreeNode>>, String> {
    let items = match value {
        OjValue::Array(items) => items,
        _ => return Err("Expected a level-order tree array".to_string()),
    };
    let mut pool: Vec<Option<Box<TreeNode>>> = Vec::with_capacity(items.len());
    for item in items {
        match item {
            OjValue::Int(number) => {
                pool.push(Some(Box::new(TreeNode { val: *number as i32, left: None, right: None })));
            }
            OjValue::Null => pool.push(None),
            _ => return Err("Tree slots must be integers or null".to_string()),
        }
    }
    if pool.is_empty() || pool[0].is_none() {
        return Ok(None);
    }
    let mut root = pool[0].take();
    let mut queue: std::collections::VecDeque<*mut TreeNode> = std::collections::VecDeque::new();
    queue.push_back(root.as_mut().unwrap().as_mut());
    let mut index = 1usize;
    while let Some(node_pointer) = queue.pop_front() {
        for side in 0..2 {
            if index >= pool.len() {
                break;
            }
            if pool[index].is_some() {
                let mut child = pool[index].take().unwrap();
                queue.push_back(child.as_mut() as *mut TreeNode);
                unsafe {
                    if side == 0 {
                        (*node_pointer).left = Some(child);
                    } else {
                        (*node_pointer).right = Some(child);
                    }
                }
            }
            index += 1;
        }
    }
    Ok(root)
}

// tree_node codec encode: tree -> level-order OjValue array, trailing
// nulls trimmed, so results compare as plain JSON.
fn coderpuzzle_design_tree_value(root: Option<Box<TreeNode>>) -> OjValue {
    let mut items: Vec<OjValue> = Vec::new();
    let mut queue: std::collections::VecDeque<Option<&TreeNode>> = std::collections::VecDeque::new();
    if root.is_some() {
        queue.push_back(root.as_deref());
    }
    while let Some(node) = queue.pop_front() {
        match node {
            None => items.push(OjValue::Null),
            Some(tree_node) => {
                items.push(OjValue::Int(tree_node.val as i64));
                queue.push_back(tree_node.left.as_deref());
                queue.push_back(tree_node.right.as_deref());
            }
        }
    }
    while items.last().map_or(false, |item| matches!(item, OjValue::Null)) {
        items.pop();
    }
    OjValue::Array(items)
}
"""


def _design_convert(spec: dict[str, Any], source: str) -> str:
    """Parameter conversion for the design replay: the interactive
    converter plus the tree_node codec's level-order array -> tree."""
    if spec["kind"] == "binary_tree":
        return f"coderpuzzle_design_tree({source})?"
    return _convert(spec, source)

MAIN_TEMPLATE = """\
fn coderpuzzle_run() -> Result<String, String> {
    let mut raw = Vec::new();
    std::io::stdin().read_to_end(&mut raw).map_err(|e| e.to_string())?;
    let mut tagged = OjTaggedReader::new(raw);
    let actions_value = tagged.value()?;
    let params_value = tagged.value()?;
    let actions = match actions_value { OjValue::Array(v) => v, _ => return Err("Design actions must be a list".to_string()) };
    let params = match params_value { OjValue::Array(v) => v, _ => return Err("Design params must be a list".to_string()) };
    if actions.is_empty() || actions.len() != params.len() {
        return Err("Design input requires equally sized actions and params".to_string());
    }
    let constructor_row = match &params[0] { OjValue::Array(v) => v.clone(), _ => vec![] };
    let primary = coderpuzzle_construct_@CLASS_NAME@(&constructor_row)?;
    // Named instances ({"new": handle} actions) live here for the whole
    // replay; $ref arguments and "on" targets resolve through it. Boxes
    // keep the objects alive; handles map to raw pointers, the module's
    // established pattern for structures more than one caller reaches.
    // The primary instance from params[0] is registered when actions[0]
    // names it, and stays the default target otherwise.
    let mut alive: Vec<Box<@CLASS_NAME@>> = Vec::new();
    let mut instances: Vec<(String, *mut @CLASS_NAME@)> = Vec::new();
    alive.push(Box::new(primary));
    let primary_pointer: *mut @CLASS_NAME@ = alive.last_mut().unwrap().as_mut() as *mut _;
    if let OjValue::Object(fields) = &actions[0] {
        for (key, item) in fields {
            if key == "new" {
                if let OjValue::Str(handle) = item {
                    if handle.is_empty() || instances.iter().any(|(name, _)| name == handle) {
                        return Err(format!("Duplicate or invalid design instance handle: {}", handle));
                    }
                    instances.push((handle.clone(), primary_pointer));
                }
            }
        }
    }
    let mut outputs: Vec<OjValue> = vec![OjValue::Null];
    let mut previous = OjValue::Null;
    for step in 1..actions.len() {
        // A {"new": handle} action constructs another instance of the
        // design class from this step's params row; constructors return
        // nothing, so the recorded slot is null.
        if let OjValue::Object(fields) = &actions[step] {
            let mut new_handle: Option<String> = None;
            for (key, item) in fields {
                if key == "new" {
                    if let OjValue::Str(handle) = item {
                        new_handle = Some(handle.clone());
                    }
                }
            }
            if let Some(handle) = new_handle {
                if handle.is_empty() || instances.iter().any(|(name, _)| name == &handle) {
                    return Err(format!("Duplicate or invalid design instance handle: {}", handle));
                }
                let row = match &params[step] { OjValue::Array(v) => v.clone(), _ => vec![] };
                alive.push(Box::new(coderpuzzle_construct_@CLASS_NAME@(&row)?));
                let pointer: *mut @CLASS_NAME@ = alive.last_mut().unwrap().as_mut() as *mut _;
                instances.push((handle, pointer));
                outputs.push(OjValue::Null);
                previous = OjValue::Null;
                continue;
            }
        }
        let mut name = String::new();
        let mut repeat = 1i64;
        let mut on_handle: Option<String> = None;
        match &actions[step] {
            OjValue::Str(v) => name = v.clone(),
            OjValue::Object(fields) => {
                for (key, item) in fields {
                    if key == "call" {
                        if let OjValue::Str(v) = item { name = v.clone(); }
                    }
                    if key == "repeat" {
                        if let OjValue::Int(v) = item { repeat = *v; }
                    }
                    if key == "on" {
                        if let OjValue::Str(v) = item { on_handle = Some(v.clone()); }
                    }
                }
            }
            _ => return Err("Design action must be a string".to_string()),
        }
        let mut target = primary_pointer;
        if let Some(handle) = &on_handle {
            match instances.iter().find(|(name, _)| name == handle) {
                Some((_, pointer)) => target = *pointer,
                None => return Err(format!("Unknown design instance handle: {}", handle)),
            }
        }
        let raw_arguments = match &params[step] { OjValue::Array(v) => v.clone(), _ => vec![] };
        let mut call_arguments: Vec<OjValue> = Vec::with_capacity(raw_arguments.len());
        // Live instances ride this parallel slot vector: a {"$ref": handle}
        // argument resolves to its pointer here, and the dispatch hands it
        // over as &mut through the design class itself.
        let mut instance_arguments: Vec<*mut @CLASS_NAME@> = vec![std::ptr::null_mut(); raw_arguments.len()];
        for (slot, argument) in raw_arguments.iter().enumerate() {
            if let OjValue::Object(fields) = argument {
                if fields.len() == 1 && fields[0].0 == "$prev" {
                    call_arguments.push(previous.clone());
                    continue;
                }
                if fields.len() == 1 && fields[0].0 == "$ref" {
                    if let OjValue::Str(handle) = &fields[0].1 {
                        match instances.iter().find(|(name, _)| name == handle) {
                            Some((_, pointer)) => instance_arguments[slot] = *pointer,
                            None => return Err(format!("Unknown design instance handle: {}", handle)),
                        }
                        call_arguments.push(argument.clone());
                        continue;
                    }
                }
            }
            call_arguments.push(argument.clone());
        }
        let solution: &mut @CLASS_NAME@ = unsafe { &mut *target };
        if repeat > 1 {
            let mut frequencies: std::collections::BTreeMap<String, i64> = std::collections::BTreeMap::new();
            let mut last = OjValue::Null;
            for _trial in 0..repeat {
                let result = dispatch_@CLASS_NAME@(solution, &name, &call_arguments, &instance_arguments)?;
                *frequencies.entry(coderpuzzle_json(&result)).or_insert(0) += 1;
                last = result;
            }
            let table = OjValue::Object(frequencies.into_iter().map(|(key, count)| {
                (key, OjValue::Int(count))
            }).collect());
            outputs.push(table);
            // $prev carries the last raw result, not the frequency table
            // (python_harness pipes raw_output).
            previous = last;
        } else {
            let result = dispatch_@CLASS_NAME@(solution, &name, &call_arguments, &instance_arguments)?;
            outputs.push(result.clone());
            previous = result;
        }
    }
    Ok(coderpuzzle_json(&OjValue::Array(outputs)))
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
    needs_tree = any(spec["kind"] == "binary_tree" for spec in constructor_specs)
    needs_nested = any(spec["kind"] == "nested" for spec in constructor_specs)
    for index, spec in enumerate(constructor_specs):
        constructor_convert.append(
            f"    let coderpuzzle_ctor_{index}: {_rust_type(spec)} = {_design_convert(spec, f'&row[{index}]')};"
        )
    constructor_args = ", ".join(f"coderpuzzle_ctor_{index}" for index in range(len(constructor_specs)))
    # Construction is one generated helper so params[0] and any {"new":
    # handle} action build instances through the same conversion.
    construct_helper = (
        f"fn coderpuzzle_construct_{class_name}(row: &[OjValue]) -> Result<{class_name}, String> {{\n"
        + "\n".join(constructor_convert)
        + f"\n    Ok({class_name}::new({constructor_args}))\n}}\n"
    )

    dispatch_arms = []
    for method in invocation.get("methods", []):
        name = method.get("name")
        rust_name = entrypoints.get(f"rust.{name}", name)
        specs = [
            type_spec(p.get("value_type"), f"{name} parameter {index + 1}")
            for index, p in enumerate(method.get("parameters", []))
        ]
        needs_tree = needs_tree or any(spec["kind"] == "binary_tree" for spec in specs)
        needs_nested = needs_nested or any(spec["kind"] == "nested" for spec in specs)
        args = ", ".join(
            (f"unsafe {{ &mut *instance_arguments[{index}] }}"
             if spec["kind"] == "instance"
             else _design_convert(spec, f"&call_arguments[{index}]"))
            for index, spec in enumerate(specs)
        )
        returns_tree = (
            method.get("return_type") is not None
            and method["return_type"].get("kind") == "binary_tree"
        )
        needs_tree = needs_tree or returns_tree
        needs_nested = needs_nested or (
            method.get("return_type") is not None
            and method["return_type"].get("kind") == "nested"
        )
        if returns_tree:
            dispatch_arms.append(
                f'        "{name}" => Ok(coderpuzzle_design_tree_value(solution.{rust_name}({args}))),'
            )
        else:
            dispatch_arms.append(f'        "{name}" => Ok(OjValue::oj_from(solution.{rust_name}({args}))),')
    dispatch = (
        f"fn dispatch_{class_name}(solution: &mut {class_name}, name: &str, call_arguments: &[OjValue], "
        f"instance_arguments: &[*mut {class_name}]) -> Result<OjValue, String> {{\n"
        "    match name {\n"
        + "\n".join(dispatch_arms)
        + f'\n        _ => Err(format!("Unknown design method: {{}}", name)),\n    }}\n}}\n'
    )

    # Rust has no overloading: one trait, one generic call site
    oj_from = """
trait OjFrom<T> { fn oj_from(value: T) -> OjValue; }
impl OjFrom<i32> for OjValue { fn oj_from(value: i32) -> OjValue { OjValue::Int(value as i64) } }
impl OjFrom<i64> for OjValue { fn oj_from(value: i64) -> OjValue { OjValue::Int(value) } }
impl OjFrom<f64> for OjValue { fn oj_from(value: f64) -> OjValue { OjValue::Double(value) } }
impl OjFrom<bool> for OjValue { fn oj_from(value: bool) -> OjValue { OjValue::Bool(value) } }
impl OjFrom<String> for OjValue { fn oj_from(value: String) -> OjValue { OjValue::Str(value) } }
impl OjFrom<&str> for OjValue { fn oj_from(value: &str) -> OjValue { OjValue::Str(value.to_string()) } }
impl OjFrom<()> for OjValue { fn oj_from(_value: ()) -> OjValue { OjValue::Null } }
impl OjFrom<Vec<i32>> for OjValue { fn oj_from(values: Vec<i32>) -> OjValue { OjValue::Array(values.into_iter().map(|v| OjValue::Int(v as i64)).collect()) } }
impl OjFrom<Vec<i64>> for OjValue { fn oj_from(values: Vec<i64>) -> OjValue { OjValue::Array(values.into_iter().map(OjValue::Int).collect()) } }
impl OjFrom<Vec<String>> for OjValue { fn oj_from(values: Vec<String>) -> OjValue { OjValue::Array(values.into_iter().map(OjValue::Str).collect()) } }
impl OjFrom<Vec<Vec<i32>>> for OjValue { fn oj_from(rows: Vec<Vec<i32>>) -> OjValue { OjValue::Array(rows.into_iter().map(OjValue::oj_from).collect()) } }
impl OjFrom<Vec<Vec<i64>>> for OjValue { fn oj_from(rows: Vec<Vec<i64>>) -> OjValue { OjValue::Array(rows.into_iter().map(OjValue::oj_from).collect()) } }
"""

    provided_source = "".join(
        content + "\n"
        for _, content in sorted((assembly or {}).get("provided", {}).items())
        if _.endswith(".rs")
    )
    code = re.sub(r"^\s*(?:pub )?struct Solution;\s*$\n?", "", code, flags=re.M)

    source = (
        WRAPPER_HEAD + "\n" + oj_from + "\n" + provided_source
        + (TREE_HELPERS + "\n" if needs_tree else "")
        + (NESTED_HELPERS + "\n" if needs_nested else "") + code + "\n"
        + construct_helper + "\n" + dispatch + "\n"
        + MAIN_TEMPLATE.replace("@CLASS_NAME@", class_name)
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
