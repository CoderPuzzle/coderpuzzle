"""Design-kind wrapper generation for Go.

Same protocol as js_design.py (the reference is python_harness
._invoke_design): actions + params, constructor from params[0], $prev
piping, randomized actions as frequency tables. The case travels as one
tagged stream. Go's wrapper decodes into []any and replays through
reflection-free dispatch: the method table is known at generation time,
so the wrapper emits a switch on the action name calling typed methods
via generated conversion per the invocation's parameter specs.
"""
from __future__ import annotations

import re
from pathlib import Path
from typing import Any

from .base import ExecutorError, PreparedProgram
from .typed import go_type, type_spec

WRAPPER_HEAD = """\
package main

import (
	"fmt"
	"os"
)

func coderpuzzleEmit(line string) {
	if channel := os.NewFile(63, "protocol"); channel != nil {
		if _, errorValue := channel.WriteString(line + "\\n"); errorValue == nil {
			return
		}
	}
	fmt.Println(line)
}

type ojReader struct {
	bytes    []byte
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
"""



WRAPPER_HEAD_HEADLESS = WRAPPER_HEAD.replace('package main\n\nimport (\n\t"fmt"\n\t"os"\n)\n\n', '')



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
	actionsValue := reader.value()
	paramsValue := reader.value()
	actions, actionsOk := actionsValue.([]any)
	params, paramsOk := paramsValue.([]any)
	if !actionsOk || !paramsOk || len(actions) != len(params) || len(actions) == 0 {
		panic("Design input requires equally sized actions and params")
	}
	constructorRow, _ := params[0].([]any)
	solution := New@CLASS_NAME@(constructorRow)
	// Named instances ({"new": handle} actions) live here for the whole
	// replay; $ref arguments and "on" targets resolve through it. The
	// primary instance from params[0] is registered when actions[0] names
	// it, and stays the default target otherwise.
	instances := map[string]*@CLASS_NAME@{}
	if first, isObject := actions[0].(map[string]any); isObject {
		if handleValue, has := first["new"]; has {
			handle, isHandle := handleValue.(string)
			if !isHandle || handle == "" {
				panic("Design new action needs a string handle")
			}
			if _, exists := instances[handle]; exists {
				panic("Duplicate design instance handle: " + handle)
			}
			instances[handle] = solution
		}
	}
	outputs := []any{nil}
	var previous any
	for step := 1; step < len(actions); step++ {
		action := actions[step]
		// A {"new": handle} action constructs another instance of the
		// design class from this step's params row; constructors return
		// nothing, so the recorded slot is nil.
		if row, isObject := action.(map[string]any); isObject {
			if handleValue, has := row["new"]; has {
				handle, isHandle := handleValue.(string)
				if !isHandle || handle == "" {
					panic("Design new action needs a string handle")
				}
				if _, exists := instances[handle]; exists {
					panic("Duplicate design instance handle: " + handle)
				}
				newRow, _ := params[step].([]any)
				instances[handle] = New@CLASS_NAME@(newRow)
				outputs = append(outputs, nil)
				previous = nil
				continue
			}
		}
		target := solution
		repeat := int64(1)
		if row, isObject := action.(map[string]any); isObject {
			if callValue, has := row["call"]; has {
				action = callValue
			}
			if repeatValue, has := row["repeat"]; has {
				if number, isNumber := repeatValue.(int64); isNumber {
					repeat = number
				}
			}
			if onValue, has := row["on"]; has {
				handle, isHandle := onValue.(string)
				if !isHandle {
					panic("Design on action needs a string handle")
				}
				instance, exists := instances[handle]
				if !exists {
					panic("Unknown design instance handle: " + handle)
				}
				target = instance
			}
		}
		name, isName := action.(string)
		if !isName {
			panic("Design action must be a string")
		}
		row, _ := params[step].([]any)
		callArguments := make([]any, 0, len(row))
		for _, argument := range row {
			if pipe, isPipe := argument.(map[string]any); isPipe && len(pipe) == 1 {
				if _, exists := pipe["$prev"]; exists {
					callArguments = append(callArguments, previous)
					continue
				}
				if reference, exists := pipe["$ref"]; exists {
					handle, isHandle := reference.(string)
					if !isHandle {
						panic("Design $ref argument must be a string handle")
					}
					instance, known := instances[handle]
					if !known {
						panic("Unknown design instance handle: " + handle)
					}
					callArguments = append(callArguments, instance)
					continue
				}
			}
			callArguments = append(callArguments, argument)
		}
		if repeat > 1 {
			frequencies := map[string]int{}
			var last any
			for trial := int64(0); trial < repeat; trial++ {
				result := dispatch@CLASS_NAME@(target, name, callArguments)
				last = result
				frequencies[coderpuzzleJSON(result)]++
			}
			outputs = append(outputs, frequencies)
			// $prev carries the last raw result, not the frequency table
			// (python_harness pipes raw_output).
			previous = last
		} else {
			result := dispatch@CLASS_NAME@(target, name, callArguments)
			outputs = append(outputs, result)
			previous = result
		}
	}
	coderpuzzleEmit("__CODERPUZZLE_RESULT__" + fmt.Sprintf(`{"status":"completed","actual":%s}`, coderpuzzleJSON(outputs)))
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
    lines = [line for line in source.splitlines() if not line.strip().startswith("package ")]
    return "\n".join(lines)


TREE_HELPERS = """\
// coderpuzzleDesignTree builds a *TreeNode from the tree_node codec's
// level-order row (nil for absent children), assigning two slots per
// queued node exactly like the harness's codec.
func coderpuzzleDesignTree(value any) *TreeNode {
	row, ok := value.([]any)
	if !ok {
		panic("Expected a level-order tree array")
	}
	if len(row) == 0 || row[0] == nil {
		return nil
	}
	rootValue, _ := row[0].(int64)
	root := &TreeNode{Val: int(rootValue)}
	queue := []*TreeNode{root}
	index := 1
	for len(queue) > 0 && index < len(row) {
		node := queue[0]
		queue = queue[1:]
		if index < len(row) {
			if row[index] != nil {
				childValue, _ := row[index].(int64)
				node.Left = &TreeNode{Val: int(childValue)}
				queue = append(queue, node.Left)
			}
			index++
		}
		if index < len(row) {
			if row[index] != nil {
				childValue, _ := row[index].(int64)
				node.Right = &TreeNode{Val: int(childValue)}
				queue = append(queue, node.Right)
			}
			index++
		}
	}
	return root
}

// coderpuzzleDesignTreeArray serializes a tree back to the codec's level-order
// row (trailing nils trimmed) so results compare as plain JSON.
func coderpuzzleDesignTreeArray(root *TreeNode) []any {
	if root == nil {
		return []any{}
	}
	values := []any{}
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		if node == nil {
			values = append(values, nil)
			continue
		}
		values = append(values, node.Val)
		queue = append(queue, node.Left, node.Right)
	}
	for len(values) > 0 && values[len(values)-1] == nil {
		values = values[:len(values)-1]
	}
	return values
}
"""


def _convert(spec: dict[str, Any], source: str, class_name: str = "") -> str:
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
    if kind == "binary_tree":
        return f"coderpuzzleDesignTree({source})"
    if kind == "instance":
        # A live design object resolved in main from a {"$ref": handle}
        # marker: the value crossing here is already the *Class itself
        # (backticks because the message carries double quotes).
        return (
            f'(func() *{class_name} {{ v, ok := {source}.(*{class_name}); '
            f'if !ok {{ panic(`Parameter must be a {{"$ref": handle}} instance reference`) }}; return v }})()'
        )
    if kind == "nested":
        # Self-recursive closure over the JSON shape. The bundle-provided
        # NestedInteger is pointer-based with unexported fields; this code
        # is concatenated into the same package, so an integer hold is
        # built directly as NestedInteger{integer: &held}.
        return (
            f'(func() NestedInteger {{ var coderpuzzleBuild func(v any) NestedInteger; coderpuzzleBuild = func(v any) NestedInteger {{ '
            f'switch t := v.(type) {{ case int64: held := int(t); return NestedInteger{{integer: &held}}; case []any: '
            f'var node NestedInteger; for _, item := range t {{ node.Add(coderpuzzleBuild(item)) }}; return node; '
            f'default: panic("Expected a nested list") }} }}; return coderpuzzleBuild({source}) }})()'
        )
    if kind == "array":
        inner = _convert(spec["items"], "item", class_name)
        return (
            f'(func() []{go_type(spec["items"])} {{ row, ok := {source}.([]any); if !ok {{ panic("Expected an array") }}; '
            f'out := make([]{go_type(spec["items"])}, 0, len(row)); '
            f'for _, item := range row {{ out = append(out, {inner}) }}; return out }})()'
        )
    raise ExecutorError(f"Design parameter type {kind} is not supported in Go")


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

    needs_tree = any(spec["kind"] == "binary_tree" for spec in constructor_specs)
    dispatch_cases = []
    for method in invocation.get("methods", []):
        name = method.get("name")
        go_name = entrypoints.get(f"go.{name}", name)
        specs = [
            type_spec(p.get("value_type"), f"{name} parameter {index + 1}")
            for index, p in enumerate(method.get("parameters", []))
        ]
        needs_tree = needs_tree or any(spec["kind"] == "binary_tree" for spec in specs)
        args = ", ".join(
            _convert(spec, f"callArguments[{index}]", class_name) for index, spec in enumerate(specs)
        )
        returns = method.get("return_type") is not None and method["return_type"].get("kind") != "void"
        call = f"solution.{go_name}({args})"
        if method.get("return_type") is not None and method["return_type"].get("kind") == "binary_tree":
            needs_tree = True
            call = f"coderpuzzleDesignTreeArray({call})"
        dispatch_cases.append(
            f'\tcase "{name}":\n\t\t{"return " + call if returns else call + "; return nil"}'
        )
    dispatch = (
        f"func dispatch{class_name}(solution *{class_name}, name string, callArguments []any) any {{\n"
        "\tswitch name {\n"
        + "\n".join(dispatch_cases)
        + f'\n\tdefault:\n\t\tpanic("Unknown design method: " + name)\n\t}}\n}}\n'
    )

    # Constructor adapter: converts the case row per the constructor
    # parameter specs, then hands the typed values to the submission's
    # own constructor (NewXTyped) — the Go analogue of a design class
    # constructor, kept in the assembled source beside the struct.
    if constructor_specs:
        typed = ", ".join(_convert(spec, f"row[{index}]", class_name) for index, spec in enumerate(constructor_specs))
        constructor_shim = (
            f"func New{class_name}(row []any) *{class_name} {{\n"
            f"\treturn New{class_name}Typed({typed})\n"
            f"}}\n"
        )
    else:
        # No constructor parameters: still route through the submission's
        # own NewXTyped — skipping it would leave its fields zero-valued
        # (nil maps, nil pointers) and never run user initialization.
        constructor_shim = f"func New{class_name}(row []any) *{class_name} {{\n\treturn New{class_name}Typed()\n}}\n"

    provided_source = "".join(
        strip_package(content) + "\n"
        for _, content in sorted((assembly or {}).get("provided", {}).items())
        if _.endswith(".go")
    )

    # Submitted code may import stdlib packages; Go requires every import
    # to sit in the file's import preamble, so user imports are lifted out
    # of the code and merged with the wrapper's own (same rule as the
    # non-design wrapper's _merge_imports).
    from .go import GO_IMPORT_BLOCK
    user_code = strip_package(code)
    packages = {"encoding/json", "fmt", "os", "unsafe"}
    for match in GO_IMPORT_BLOCK.finditer(user_code):
        packages.update(re.findall(r'"([^"]+)"', match.group(0)))
        user_code = user_code.replace(match.group(0), "", 1)
    import_block = "import (\n" + "".join(f'\t"{package}"\n' for package in sorted(packages)) + ")"

    source = (
        "package main\n\n" + import_block + "\n\n"
        + WRAPPER_HEAD_HEADLESS
        + "\n" + JSON_HELPER
        + "\n" + provided_source + "\n" + (TREE_HELPERS + "\n" if needs_tree else "")
        + user_code.strip("\n") + "\n"
        + constructor_shim + "\n" + dispatch + "\n"
        + MAIN_TEMPLATE.replace("@CLASS_NAME@", class_name)
    )
    source_path = job_root / "main.go"
    executable = job_root / "solution"
    source_path.write_text(source, encoding="utf-8")
    source_path.chmod(0o444)
    executor.compile(
        job_root,
        (executor.compiler_path, "build", "-trimpath", "-ldflags=-s -w", "-o", str(executable), str(source_path)),
        executable,
        {"PATH": "/usr/bin:/bin", "HOME": "/nonexistent", "TMPDIR": "/tmp", "LANG": "C.UTF-8", "GOCACHE": "/tmp/coderpuzzle-gocache", "GOPATH": "/tmp/gopath", "GOMODCACHE": "/tmp/gomodcache", "GO111MODULE": "off"},
    )
    return PreparedProgram(
        command=(str(executable),),
        environment={"PATH": "/usr/bin:/bin", "HOME": "/nonexistent", "TMPDIR": str(scratch), "LANG": "C.UTF-8"},
    )
