#!/usr/bin/env python3
"""Generate every starter.* file for a problem bundle from its problem.json.

Starters are derived code: never edit them by hand — change problem.json and
re-run this script. The file extension selects the language (py, javascript,
typescript, java, cpp, go, rust, sql) and the set of generated starters
defines the languages the problem offers. Function problems generate all seven languages (json-kind invocations,
which the typed executors cannot express, generate javascript +
typescript only); sql a single starter.sql; shell a single starter.sh;
design
(class) and interactive
(oracle) problems also generate all seven languages, concurrent (threaded
schedule) problems python3 + java — the judge's typed wrappers implement
the actions/params and oracle protocols in every language, the schedule
protocol in two.

Starters for problems whose wire carries hidden data structures open with
LeetCode-style commented-out definitions of exactly the types the invocation
uses, in every offered language; the same block leads each authored
solution (docs/FORMAT.md "Hidden-type definition comments"). The Python
import block names only the typing names the rendered annotations use.

Usage:
  gen_starters.py problems/0001-0100/0001_two-sum [ … ]        # default: all
  gen_starters.py --check problems/…                          # diff, write nothing
"""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from format import format_content  # noqa: E402 — same pinned toolchain as CI

FUNCTION_LANGUAGES = (
    "python3",
    "javascript",
    "typescript",
    "java",
    "cpp",
    "go",
    "rust",
)
EXTENSIONS = {
    "python3": "py",
    "javascript": "js",
    "typescript": "ts",
    "java": "java",
    "cpp": "cpp",
    "go": "go",
    "rust": "rs",
    "sql": "sql",
    "shell": "sh",
}


def _kind(spec: dict) -> str:
    if spec["kind"] == "integer":
        return "integer32" if int(spec.get("bits", 32)) == 32 else "integer64"
    return spec["kind"]


def _uses_structs(invocation: dict) -> set[str]:
    found: set[str] = set()

    def walk(spec) -> None:
        if not isinstance(spec, dict):
            return
        kind = spec.get("kind")
        if kind == "linked_list":
            found.add("list")
        elif kind == "binary_tree":
            found.add("tree")
        elif kind in STRUCT_KINDS or kind in {
            "doubly_list",
            "doubly_list_node",
            "random_tree",
            "special_tree",
            "nary_tree_nodes",
            "nary_tree_ref",
        }:
            found.add(kind)
        walk(spec.get("items"))
        for field in spec.get("fields") or []:
            if isinstance(field, dict):
                walk(field.get("value_type"))

    for parameter in invocation.get("parameters", []):
        walk(parameter.get("value_type"))
    walk(invocation.get("return_type"))
    # Design/concurrent invocations carry their typed shapes here instead.
    for parameter in (invocation.get("constructor") or {}).get("parameters", []):
        walk(parameter.get("value_type"))
    for method in invocation.get("methods", []):
        for parameter in method.get("parameters", []):
            walk(parameter.get("value_type"))
        walk(method.get("return_type"))
    return found


def _entry(invocation: dict, language: str) -> str:
    method = invocation.get("method")
    entry = invocation.get("entrypoints", {}).get(language)
    name = entry or method
    if language == "rust" and not entry:
        parts = re.findall(r"[A-Z]+(?![a-z])|[A-Z][a-z0-9]*|[a-z0-9]+", method or "")
        name = "_".join(part.lower() for part in parts)
    return name


# --- per-language type rendering -------------------------------------------------


# The Python style starters are emitted in. "legacy" keeps the
# LeetCode-era annotations (typing.List, typing.Optional) that the
# extend-derived bundles were authored with; "modern" uses PEP 585/604
# (list[int], X | None) and drops the typing import unless something
# genuinely needs it. Provenance decides: the bettercode-derived slugs
# (the adapter set in scripts/problems-tooling/adapt-mapping.json) is modern;
# extend-derived stays legacy — including the thirteen bundles whose
# ids also exist in the bettercode set.
PYTHON_STYLE = "legacy"

_modern_slugs: set[str] | None = None


def is_modern_python_slug(slug: str) -> bool:
    """True for bettercode-derived bundles (modern starters). The adapter
    set comes from the adapted tree's MAPPING.json.

    That ledger is checked in at scripts/problems-tooling/adapt-mapping.json
    and is used by default; set CODERPUZZLE_ADAPT_MAPPING only to override it
    with the adapted tree's copy (problems/MAPPING.json). Guessing is not an
    option: a missing ledger file raises SystemExit here, and an
    existing-but-empty ledger would silently answer False for every slug and
    regenerate every Python starter in the legacy style."""
    global _modern_slugs
    if _modern_slugs is None:
        configured = os.environ.get("CODERPUZZLE_ADAPT_MAPPING", "").strip()
        mapping_path = Path(configured) if configured else (
            Path(__file__).resolve().parent / "problems-tooling" / "adapt-mapping.json"
        )
        if not mapping_path.is_file():
            raise SystemExit(
                f"MAPPING.json not found at {mapping_path}. Set "
                "CODERPUZZLE_ADAPT_MAPPING to the adapted tree's MAPPING.json "
                "or use scripts/problems-tooling/adapt-mapping.json; the "
                "Python starter style "
                "depends on it."
            )
        mapping = json.loads(mapping_path.read_text(encoding="utf-8"))
        _modern_slugs = {row["adapted"].split("_", 1)[1] for row in mapping.values()}
    return slug in _modern_slugs


def set_python_style(style: str) -> None:
    global PYTHON_STYLE
    if style not in ("legacy", "modern"):
        raise SystemExit(f"unknown python style {style!r} (legacy or modern)")
    PYTHON_STYLE = style


def resolve_python_style(explicit: str | None, slug: str) -> str:
    """One style rule for every caller (CLI --style, runner CLI, check.py):
    an explicit flag wins, then CODERPUZZLE_PYTHON_STYLE pins a whole tree
    (the adapted twin runs pinned modern), then provenance decides."""
    if explicit:
        return explicit
    pinned = os.environ.get("CODERPUZZLE_PYTHON_STYLE", "").strip()
    if pinned:
        return pinned
    return "legacy" if not is_modern_python_slug(slug) else "modern"


def _py_imports(callbacks: bool = False, rendered: list[str] | None = None) -> list[str]:
    """The leading import block for a Python starter, per style. Exact: a
    legacy starter imports only the typing names its annotations actually
    render (Optional/List), plus Callable for release callbacks."""
    if PYTHON_STYLE == "modern":
        return [f"from typing import Callable\n\n\n"] if callbacks else []
    text = " ".join(rendered or [])
    names = (
        (["Callable"] if callbacks else [])
        + (["List"] if re.search(r"\bList\[", text) else [])
        + (["Optional"] if re.search(r"\bOptional\[", text) else [])
    )
    if not names:
        return []
    return [f"from typing import {', '.join(names)}\n\n\n"]


def python_type(spec: dict) -> str:
    kind = _kind(spec)
    if kind == "struct":
        return spec["class"]
    if kind in {"graph", "random_list"}:
        return _py_optional(_node_class(spec))
    return {
        "integer32": "int",
        "integer64": "int",
        "number": "float",
        "boolean": "bool",
        "string": "str",
        "linked_list": "ListNode | None"
        if PYTHON_STYLE == "modern"
        else "Optional[ListNode]",
        "binary_tree": "TreeNode | None"
        if PYTHON_STYLE == "modern"
        else "Optional[TreeNode]",
        "nary_tree": _py_optional("Node"),
        "quad_tree": _py_optional("QuadNode"),
        "nested": "NestedInteger",
        "next_tree": _py_optional("NodeWithNext"),
        "circular_list": _py_optional("ListNode"),
        "doubly_circular": _py_optional("NodeWithNext"),
        "multi_list": _py_optional("MultiListNode"),
        "alias_list": _py_optional("ListNode"),
        "graph": _py_optional("Node"),
        "random_list": _py_optional("Node"),
        "doubly_list": _py_optional(_node_class(spec)),
        "doubly_list_node": _py_optional(_node_class(spec)),
        "random_tree": _py_optional(_node_class(spec)),
        "special_tree": _py_optional("TreeNode"),
        "nary_tree_nodes": "list[Node]" if PYTHON_STYLE == "modern" else "List[Node]",
        "nary_tree_ref": _py_optional("Node"),
    }.get(kind) or (
        "list[" if PYTHON_STYLE == "modern" else "List["
    ) + f"{python_type(spec['items'])}]"


def _py_optional(name: str) -> str:
    return f"{name} | None" if PYTHON_STYLE == "modern" else f"Optional[{name}]"


def _node_class(spec: dict) -> str:
    """Graph and random-list nodes are the using problem's provided/ class
    (value_type.class, mirroring the runner's typed.py renderers); legacy
    manifests fall back to the generic Node."""
    name = spec.get("class")
    return name if isinstance(name, str) and name else "Node"


def javascript_type(spec: dict) -> str:
    kind = _kind(spec)
    if kind == "struct":
        return spec["class"]
    if kind in {
        "graph",
        "random_list",
        "doubly_list",
        "doubly_list_node",
        "random_tree",
    }:
        return _node_class(spec)
    return {
        "integer32": "number",
        "integer64": "number",
        "number": "number",
        "boolean": "boolean",
        "string": "string",
        "linked_list": "ListNode",
        "binary_tree": "TreeNode",
        "nary_tree": "Node",
        "quad_tree": "QuadNode",
        "nested": "NestedInteger",
        "next_tree": "NodeWithNext",
        "circular_list": "ListNode",
        "doubly_circular": "NodeWithNext",
        "multi_list": "MultiListNode",
        "alias_list": "ListNode",
        "graph": "Node",
        "random_list": "Node",
        "special_tree": "TreeNode",
        "nary_tree_nodes": "Node[]",
        "nary_tree_ref": "Node",
        "json": "any",
    }.get(kind) or f"{javascript_type(spec['items'])}[]"


def typescript_type(spec: dict) -> str:
    kind = _kind(spec)
    if kind == "json":
        return "any"
    if kind == "struct":
        return spec["class"]
    if kind in {
        "graph",
        "random_list",
        "doubly_list",
        "doubly_list_node",
        "random_tree",
    }:
        return _node_class(spec) + " | null"
    scalar = {
        "integer32": "number",
        "integer64": "number",
        "number": "number",
        "boolean": "boolean",
        "string": "string",
        "linked_list": "ListNode | null",
        "binary_tree": "TreeNode | null",
        "nary_tree": "Node | null",
        "quad_tree": "QuadNode | null",
        "nested": "NestedInteger",
        "next_tree": "NodeWithNext | null",
        "circular_list": "ListNode | null",
        "doubly_circular": "NodeWithNext | null",
        "multi_list": "MultiListNode | null",
        "alias_list": "ListNode | null",
        "graph": "Node | null",
        "random_list": "Node | null",
        "special_tree": "TreeNode | null",
        "nary_tree_nodes": "Array<Node | null>",
        "nary_tree_ref": "Node | null",
    }.get(kind)
    if scalar:
        return scalar
    item = typescript_type(spec["items"])
    if " | " in item:  # postfix [] binds tighter than a union — parenthesize
        item = f"({item})"
    return f"{item}[]"


def _contains_struct(spec: dict) -> bool:
    if not isinstance(spec, dict):
        return False
    return spec.get("kind") in STRUCT_KINDS or _contains_struct(spec.get("items"))


# Every kind whose values arrive as judge-constructed objects rather than
# plain JSON scalars. A struct anywhere in an array's item tree switches
# that Java level to a boxed List (mirrors the harness decoder).
STRUCT_KINDS = (
    "linked_list",
    "binary_tree",
    "nary_tree",
    "quad_tree",
    "nested",
    "next_tree",
    "circular_list",
    "doubly_circular",
    "multi_list",
    "alias_list",
    "graph",
    "random_list",
    "struct",
)


def java_type(spec: dict) -> str:
    kind = _kind(spec)
    if kind == "struct":
        return spec["class"]
    if kind in {
        "graph",
        "random_list",
        "doubly_list",
        "doubly_list_node",
        "random_tree",
    }:
        return _node_class(spec)
    if kind == "nary_tree_nodes":
        return "List<Node>"
    scalar = {
        "integer32": "int",
        "integer64": "long",
        "number": "double",
        "boolean": "boolean",
        "string": "String",
        "linked_list": "ListNode",
        "binary_tree": "TreeNode",
        "nary_tree": "Node",
        "quad_tree": "QuadNode",
        "nested": "NestedInteger",
        "next_tree": "NodeWithNext",
        "circular_list": "ListNode",
        "doubly_circular": "NodeWithNext",
        "multi_list": "MultiListNode",
        "alias_list": "ListNode",
        "graph": "Node",
        "random_list": "Node",
        "special_tree": "TreeNode",
        "nary_tree_ref": "Node",
    }.get(kind)
    if scalar:
        return scalar
    # pure-scalar nesting stays primitive arrays (int[][]); a struct anywhere
    # in the item tree switches that level to a boxed List
    if _contains_struct(spec["items"]):
        return f"List<{java_type(spec['items'])}>"
    return f"{java_type(spec['items'])}[]"


def cpp_type(spec: dict, reference: bool = False) -> str:
    kind = _kind(spec)
    if kind == "struct":
        return spec["class"]
    if kind in {
        "graph",
        "random_list",
        "doubly_list",
        "doubly_list_node",
        "random_tree",
    }:
        return _node_class(spec) + "*"
    base = {
        "integer32": "int",
        "integer64": "long long",
        "number": "double",
        "boolean": "bool",
        "string": "string",
        "linked_list": "ListNode*",
        "binary_tree": "TreeNode*",
        "nary_tree": "Node*",
        "quad_tree": "QuadNode*",
        "nested": "NestedInteger",
        "next_tree": "NodeWithNext*",
        "circular_list": "ListNode*",
        "doubly_circular": "NodeWithNext*",
        "multi_list": "MultiListNode*",
        "alias_list": "ListNode*",
        "graph": "Node*",
        "random_list": "Node*",
        "special_tree": "TreeNode*",
        "nary_tree_nodes": "vector<Node*>",
        "nary_tree_ref": "Node*",
    }.get(kind) or f"vector<{cpp_type(spec['items'])}>"
    if reference and kind == "array":
        return base + "&"
    return base


def go_type(spec: dict) -> str:
    kind = _kind(spec)
    if kind == "struct":
        return spec["class"]
    if kind in {
        "graph",
        "random_list",
        "doubly_list",
        "doubly_list_node",
        "random_tree",
    }:
        return "*" + _node_class(spec)
    return {
        "integer32": "int",
        "integer64": "int64",
        "number": "float64",
        "boolean": "bool",
        "string": "string",
        "linked_list": "*ListNode",
        "binary_tree": "*TreeNode",
        "nary_tree": "*Node",
        "quad_tree": "*QuadNode",
        "nested": "NestedInteger",
        "next_tree": "*NodeWithNext",
        "circular_list": "*ListNode",
        "doubly_circular": "*NodeWithNext",
        "multi_list": "*MultiListNode",
        "alias_list": "*ListNode",
        "graph": "*Node",
        "random_list": "*Node",
        "special_tree": "*TreeNode",
        "nary_tree_nodes": "[]*Node",
        "nary_tree_ref": "*Node",
    }.get(kind) or f"[]{go_type(spec['items'])}"


def rust_type(spec: dict) -> str:
    kind = _kind(spec)
    if kind == "struct":
        return spec["class"]
    # Mirrors the runner's typed.py renderers. Kinds whose wire carries
    # sharing — a next/prev/random pointer two owners reach, a ring
    # closed onto its own head, a leaf ring, a node handed over by
    # identity — render as Rc<RefCell<>>: Box's single owner cannot
    # express them. QuadNode trees and NestedInteger stay fully owned.
    # Short Rc/RefCell names here (the starter gets matching `use` lines);
    # the judge's wrapper spells them fully qualified. The second wave's
    # class-honoring kinds take the provided class like graph/random_list
    # (declare "class" on every spec of the kind, same name throughout).
    return {
        "integer32": "i32",
        "integer64": "i64",
        "number": "f64",
        "boolean": "bool",
        "string": "String",
        "linked_list": "Option<Box<ListNode>>",
        "binary_tree": "Option<Box<TreeNode>>",
        "nary_tree": "Option<Box<Node>>",
        "quad_tree": "Option<Box<QuadNode>>",
        "nested": "NestedInteger",
        "next_tree": "Option<Rc<RefCell<NodeWithNext>>>",
        "circular_list": "Option<Rc<RefCell<SharedListNode>>>",
        "doubly_circular": "Option<Rc<RefCell<NodeWithNext>>>",
        "multi_list": "Option<Rc<RefCell<MultiListNode>>>",
        "alias_list": "Option<Rc<RefCell<SharedListNode>>>",
        "graph": f"Option<Rc<RefCell<{_node_class(spec)}>>>",
        "random_list": f"Option<Rc<RefCell<{_node_class(spec)}>>>",
        "doubly_list": f"Option<Rc<RefCell<{_node_class(spec)}>>>",
        "doubly_list_node": f"Option<Rc<RefCell<{_node_class(spec)}>>>",
        "random_tree": f"Option<Rc<RefCell<{_node_class(spec)}>>>",
        "special_tree": f"Option<Rc<RefCell<{_node_class(spec)}>>>",
        "nary_tree_nodes": f"Vec<Rc<RefCell<{_node_class(spec)}>>>",
        "nary_tree_ref": f"Option<Rc<RefCell<{_node_class(spec)}>>>",
    }.get(kind) or f"Vec<{rust_type(spec['items'])}>"


def rust_parameter_type(invocation: dict, spec: dict) -> str:
    """The starter's Rust type for one parameter: an aliased linked_list
    renders as the shared-ownership node (the alias_list splices real
    nodes between the lists), and an nary_tree aliased by an nary_tree_ref
    parameter renders as the shared n-ary node (the ref hands over a node
    inside it — LC 1516's rust stub is Rc-based for exactly this reason;
    mirrors the runner's renderer)."""
    parameters = invocation.get("parameters", [])
    aliased = set()
    nary_aliased = set()
    for parameter in parameters:
        value_type = parameter.get("value_type") or {}
        kind = value_type.get("kind")
        if kind == "alias_list":
            aliased.add(value_type.get("alias"))
        if kind == "nary_tree_ref":
            nary_aliased.add(value_type.get("alias"))
    index = next(
        (
            i
            for i, (_, s) in enumerate(_parameters(invocation))
            if s is spec or s == spec
        ),
        None,
    )
    if _kind(spec) == "nary_tree" and index is not None and index in nary_aliased:
        return f"Option<Rc<RefCell<{_node_class(spec)}>>>"
    if _kind(spec) != "linked_list":
        return rust_type(spec)
    if index is not None and index in aliased:
        return "Option<Rc<RefCell<SharedListNode>>>"
    return rust_type(spec)


def rust_return_type(invocation: dict, spec: dict) -> str:
    """The starter's Rust return type: an nary_tree return alongside an
    nary_tree_nodes/nary_tree_ref parameter renders as the shared n-ary
    node — LC 1506's solution returns one of the input nodes, and the
    judge serializes that return through the shared path (mirrors the
    runner's wrapper)."""
    if _kind(spec) == "nary_tree":
        for parameter in invocation.get("parameters", []):
            value_type = parameter.get("value_type") or {}
            if value_type.get("kind") in {"nary_tree_nodes", "nary_tree_ref"}:
                return f"Option<Rc<RefCell<{_node_class(spec)}>>>"
    return rust_type(spec)


# --- LeetCode-style hidden-type definition comments -------------------------------
#
# Every starter for a problem that uses hidden data structures opens with the
# LeetCode-style commented-out definition of exactly the types that problem
# uses — a ListNode-only problem never mentions TreeNode. The definitions
# mirror the bundle's provided/<language>/ sources (the judge assembles those
# with every submission), set in LeetCode's per-language comment style so the
# templates read like the originals: python `#`, rust `//`, and
# java/cpp/go/javascript/typescript as `/** ... */` blocks.

# A shape's fields: (name, type) with type one of
#   "int" | "bool" | "ptr" (self pointer) | "children" (list of self
#   pointers) | "neighbors" (a graph adjacency list)
_SHAPE_HEADERS = {
    "list": "Definition for singly-linked list.",
    "shared_list": "Definition for singly-linked list.",
    "tree": "Definition for a binary tree node.",
    "ring_tree": "Definition for a binary tree node (leaves ring-wired: left = previous leaf, right = next leaf).",
    "nary": "Definition for a Node (n-ary tree).",
    "quad": "Definition for a QuadTree node.",
    "next_tree": "Definition for a node with next pointers.",
    "doubly_circular": "Definition for a node with next pointers (left = prev, right = next).",
    "multi_list": "Definition for a multilevel doubly-linked list node.",
    "graph": "Definition for an undirected graph node.",
    "random_list": "Definition for a node with a random pointer.",
    "doubly_list": "Definition for a doubly-linked list node.",
    "random_tree": "Definition for a binary tree node with a random pointer.",
    "nested": "This is the interface that allows for creating nested lists.",
}

_SHAPE_FIELDS = {
    "list": [("val", "int"), ("next", "ptr")],
    "shared_list": [("val", "int"), ("next", "ptr")],
    "tree": [("val", "int"), ("left", "ptr"), ("right", "ptr")],
    "ring_tree": [("val", "int"), ("left", "ptr"), ("right", "ptr")],
    "nary": [("val", "int"), ("children", "children")],
    "quad": [
        ("val", "bool"),
        ("isLeaf", "bool"),
        ("topLeft", "ptr"),
        ("topRight", "ptr"),
        ("bottomLeft", "ptr"),
        ("bottomRight", "ptr"),
    ],
    "next_tree": [
        ("val", "int"),
        ("left", "ptr"),
        ("right", "ptr"),
        ("next", "ptr"),
        ("parent", "ptr"),
    ],
    "doubly_circular": [
        ("val", "int"),
        ("left", "ptr"),
        ("right", "ptr"),
        ("parent", "ptr"),
    ],
    "multi_list": [("val", "int"), ("prev", "ptr"), ("next", "ptr"), ("child", "ptr")],
    "graph": [("val", "int"), ("neighbors", "neighbors")],
    "random_list": [("val", "int"), ("next", "ptr"), ("random", "ptr")],
    "doubly_list": [("val", "int"), ("next", "ptr"), ("prev", "ptr")],
    "random_tree": [
        ("val", "int"),
        ("left", "ptr"),
        ("right", "ptr"),
        ("random", "ptr"),
    ],
}

# Shapes whose rust provided/ source is the shared-ownership Rc<RefCell<>>
# form (mirroring rust_type()'s vocabulary); the rest render Option<Box<>>.
_SHARED_SHAPES = {
    "shared_list",
    "ring_tree",
    "next_tree",
    "doubly_circular",
    "multi_list",
    "graph",
    "random_list",
    "doubly_list",
    "random_tree",
}


def _def_python(cls: str, fields, shared: bool) -> list[str]:
    params = ", ".join(
        f"{name}={'False' if type_ == 'bool' else '0' if type_ == 'int' else 'None'}"
        for name, type_ in fields
    )
    lines = [f"class {cls}:", f"    def __init__(self, {params}):"]
    lines += [f"        self.{name} = {name}" for name, _ in fields]
    return lines


def _def_java(cls: str, fields, shared: bool) -> list[str]:
    jtype = {"int": "int", "bool": "boolean", "ptr": cls, "children": f"java.util.List<{cls}>", "neighbors": f"java.util.List<{cls}>"}
    lines = [f"public class {cls} {{"] + [f"    {jtype[t]} {n};" for n, t in fields]
    single = ", ".join(f"{jtype[t]} {n}" for n, t in fields)
    lines.append(f"    {cls}() {{}}")
    first_name, first_type = fields[0]
    if len(fields) <= 2:
        lines.append(
            f"    {cls}({jtype[first_type]} {first_name}) {{ this.{first_name} = {first_name}; }}"
        )
        if len(fields) == 2:
            second_name, second_type = fields[1]
            lines.append(
                f"    {cls}({single}) {{ this.{first_name} = {first_name}; this.{second_name} = {second_name}; }}"
            )
    else:
        lines.append(f"    {cls}({jtype[first_type]} {first_name}) {{")
        lines.append(f"        this.{first_name} = {first_name};")
        lines.append("    }")
        lines.append(f"    {cls}({single}) {{")
        lines += [f"        this.{n} = {n};" for n, _ in fields]
        lines.append("    }")
    lines.append("}")
    return lines


def _def_cpp(cls: str, fields, shared: bool) -> list[str]:
    ctype = {"int": "int", "bool": "bool", "ptr": f"{cls} *", "children": f"vector<{cls} *>", "neighbors": f"vector<{cls} *>"}

    def decl(name: str, type_: str) -> str:
        separator = "" if ctype[type_].endswith("*") else " "
        return f"    {ctype[type_]}{separator}{name};"

    def init(name: str, type_: str) -> str:
        return {
            "int": f"{name}(0)",
            "bool": f"{name}(false)",
            "ptr": f"{name}(nullptr)",
            "children": f"{name}({{}})",
            "neighbors": f"{name}({{}})",
        }[type_]

    def param(name: str, type_: str) -> str:
        if type_ in ("int", "bool"):
            return f"{ctype[type_]} x"
        if type_ in ("children", "neighbors"):
            return f"{ctype[type_]} {name}"
        return f"{ctype[type_]}{name}"

    # Wide shapes: single-line ctor chains would cross clang-format's
    # reflow threshold and the comment would get rewrapped. Fields-only,
    # like LC's own QuadTree template.
    if len(fields) > 3:
        return [f"struct {cls} {{"] + [decl(n, t) for n, t in fields] + ["};"]

    lines = [f"struct {cls} {{"] + [decl(n, t) for n, t in fields]
    lines.append(f"    {cls}() : " + ", ".join(init(n, t) for n, t in fields) + " {}")
    first_name, first_type = fields[0]
    lines.append(
        f"    {cls}({param(first_name, first_type)}) : "
        + ", ".join(
            [f"{first_name}(x)"] + [init(n, t) for n, t in fields[1:]]
        )
        + " {}"
    )
    lines.append(
        f"    {cls}(" + ", ".join(param(n, t) for n, t in fields) + ") : "
        + ", ".join(f"{n}({'x' if t in ('int', 'bool') else n})" for n, t in fields)
        + " {}"
    )
    lines.append("};")
    return lines


def _def_go(cls: str, fields, shared: bool) -> list[str]:
    gtype = {"int": "int", "bool": "bool", "ptr": f"*{cls}", "children": f"[]*{cls}", "neighbors": f"[]*{cls}"}
    return [f"type {cls} struct {{"] + [f"    {n[0].upper() + n[1:]} {gtype[t]}" for n, t in fields] + ["}"]


def _def_rust(cls: str, fields, shared: bool) -> list[str]:
    def rtype(t: str) -> str:
        if t == "int":
            return "i32"
        if t == "bool":
            return "bool"
        if t == "neighbors":
            return f"Vec<std::rc::Rc<std::cell::RefCell<{cls}>>>"
        if t == "children":
            return (
                f"Vec<Option<std::rc::Rc<std::cell::RefCell<{cls}>>>>"
                if shared
                else f"Vec<Option<Box<{cls}>>>"
            )
        return (
            f"Option<std::rc::Rc<std::cell::RefCell<{cls}>>>"
            if shared
            else f"Option<Box<{cls}>>"
        )

    derives = "#[derive(Clone, Debug)]" if shared else "#[derive(PartialEq, Eq, Clone, Debug)]"
    lines = [derives, f"pub struct {cls} {{"]
    field_lines = [f"  pub {n}: {rtype(t)}" for n, t in fields]
    lines += [line + "," for line in field_lines[:-1]] + [field_lines[-1]]
    lines.append("}")
    if fields[0][1] == "bool":
        # Bool-headed shapes (QuadTree): LeetCode's template shows fields only.
        return lines
    lines += ["", "impl " + cls + " {", "  #[inline]", "  fn new(val: i32) -> Self {"]
    # Pointers first with their empties, the bare `val` shorthand last —
    # LeetCode's rust list template style.
    inits = ", ".join(
        f"{n}: {'Vec::new()' if t == 'neighbors' else 'None'}"
        for n, t in fields
        if t not in ("int", "bool")
    )
    lines.append(f"    {cls} {{ {inits + ', ' if inits else ''}val }}")
    lines += ["  }", "}"]
    return lines


def _def_typescript(cls: str, fields, shared: bool) -> list[str]:
    ttype = {"int": "number", "bool": "boolean", "ptr": f"{cls} | null", "children": f"{cls}[]", "neighbors": f"{cls}[]"}
    jsdefault = {"int": "0", "bool": "false", "ptr": "null", "children": "[]", "neighbors": "[]"}
    params = ", ".join(f"{n}?: {ttype[t]}" for n, t in fields)
    lines = [f"class {cls} {{"] + [f"    {n}: {ttype[t]}" for n, t in fields]
    lines.append(f"    constructor({params}) {{")
    lines += [
        f"        this.{n} = ({n}===undefined ? {jsdefault[t]} : {n})" for n, t in fields
    ]
    lines += ["    }", "}"]
    return lines


def _def_javascript(cls: str, fields, shared: bool) -> list[str]:
    default = {"int": "0", "bool": "false", "ptr": "null", "children": "[]", "neighbors": "[]"}
    params = ", ".join(n for n, _ in fields)
    lines = [f"function {cls}({params}) {{"]
    lines += [f"    this.{n} = ({n}===undefined ? {default[t]} : {n})" for n, t in fields]
    lines.append("}")
    return lines


def _nested_definition(language: str) -> list[str]:
    """LC 341's NestedInteger interface comment, mirroring the bundle's
    provided/<language>/ API surface."""
    if language == "python":
        return [
            "You should not implement it, or speculate about its implementation",
            "class NestedInteger:",
            "    def isInteger(self) -> bool:",
            "        ...",
            "    def getInteger(self) -> int:",
            "        ...",
            "    def setInteger(self, value: int) -> None:",
            "        ...",
            "    def add(self, item: NestedInteger) -> None:",
            "        ...",
            "    def getList(self) -> list[NestedInteger]:",
            "        ...",
        ]
    if language == "java":
        return [
            "// This is the interface that allows for creating nested lists.",
            "// You should not implement it, or speculate about its implementation",
            "public class NestedInteger {",
            "    // @return true if this NestedInteger holds a single integer",
            "    public boolean isInteger();",
            "    // @return the single integer held, or null for a nested list",
            "    public Integer getInteger();",
            "    // Set this NestedInteger to hold a single integer.",
            "    public void setInteger(int value);",
            "    // Add a nested integer to this NestedInteger's list.",
            "    public void add(NestedInteger ni);",
            "    // @return the nested list held, or an empty list for a single integer",
            "    public java.util.List<NestedInteger> getList();",
            "}",
        ]
    if language == "cpp":
        return [
            "// This is the interface that allows for creating nested lists.",
            "// You should not implement it, or speculate about its implementation",
            "class NestedInteger {",
            "  public:",
            "    // Return true if this NestedInteger holds a single integer.",
            "    bool isInteger() const;",
            "    // Return the single integer held; undefined for a nested list.",
            "    int getInteger() const;",
            "    // Set this NestedInteger to hold a single integer.",
            "    void setInteger(int value);",
            "    // Add a nested integer to this NestedInteger's list.",
            "    void add(const NestedInteger &ni);",
            "    // Return the nested list held; undefined for a single integer.",
            "    const vector<NestedInteger> &getList() const;",
            "};",
        ]
    if language == "go":
        return [
            "NestedInteger holds an integer or a list of NestedInteger (never both);",
            "the API mirrors LeetCode's Go template.",
            "type NestedInteger struct { ... }",
            "func (n NestedInteger) IsInteger() bool",
            "func (n NestedInteger) GetInteger() int",
            "func (n NestedInteger) GetList() []*NestedInteger",
            "func (n *NestedInteger) SetInteger(value int)",
            "func (n *NestedInteger) Add(elem NestedInteger)",
        ]
    if language == "rust":
        return [
            "LC's nested-list API: an integer or a list of NestedInteger.",
            "pub struct NestedInteger { integer: Option<i32>, list: Vec<NestedInteger> }",
            "impl NestedInteger {",
            "    pub fn new() -> Self",
            "    pub fn with_integer(value: i32) -> Self",
            "    pub fn is_integer(&self) -> bool",
            "    pub fn get_integer(&self) -> Option<i32>",
            "    pub fn set_integer(&mut self, value: i32)",
            "    pub fn add(&mut self, item: NestedInteger)",
            "    pub fn get_list(&self) -> &[NestedInteger]",
            "}",
        ]
    if language == "typescript":
        return [
            "You should not implement it, or speculate about its implementation",
            "class NestedInteger {",
            "    isInteger(): boolean",
            "    getInteger(): number | null",
            "    setInteger(value: number): void",
            "    add(item: NestedInteger): void",
            "    getList(): NestedInteger[]",
            "}",
        ]
    # javascript
    return [
        "You should not implement it, or speculate about its implementation",
        "function NestedInteger() { ... }",
        "NestedInteger.prototype.isInteger = function () { ... }",
        "NestedInteger.prototype.getInteger = function () { ... }",
        "NestedInteger.prototype.setInteger = function (value) { ... }",
        "NestedInteger.prototype.add = function (item) { ... }",
        "NestedInteger.prototype.getList = function () { ... }",
    ]


def _definition_blocks(invocation: dict, language: str) -> list[tuple[str, list[str]]]:
    """Ordered (header, body-lines) for each hidden type the invocation uses,
    mirroring gen_starters' type vocabularies and the bundle's provided/
    sources."""
    structs = _uses_structs(invocation)
    if not structs:
        return []

    def spec_class(*kinds: str) -> str:
        for parameter in invocation.get("parameters", []) + (
            [invocation["return_type"]] if invocation.get("return_type") else []
        ):
            stack = [parameter.get("value_type") if isinstance(parameter, dict) and "value_type" in parameter else parameter]
            while stack:
                spec = stack.pop()
                if not isinstance(spec, dict):
                    continue
                if spec.get("kind") in kinds and isinstance(spec.get("class"), str) and spec["class"]:
                    return spec["class"]
                stack.append(spec.get("items"))
                stack.extend(spec.get("fields") or [])
        return ""

    def shape_class(shape: str) -> str:
        if shape == "list":
            return "ListNode"
        if shape == "shared_list":
            return "SharedListNode" if language == "rust" else "ListNode"
        if shape == "tree":
            return "TreeNode"
        if shape == "ring_tree":
            return (spec_class("special_tree") or "TreeNode") if language == "rust" else "TreeNode"
        if shape == "nary":
            return spec_class("nary_tree", "nary_tree_nodes", "nary_tree_ref") or "Node"
        if shape == "quad":
            return "QuadNode"
        if shape == "nested":
            return "NestedInteger"
        if shape in ("next_tree", "doubly_circular"):
            return "NodeWithNext"
        if shape == "multi_list":
            return "MultiListNode"
        if shape == "graph":
            return spec_class("graph") or "Node"
        if shape == "random_list":
            return spec_class("random_list") or "Node"
        if shape in ("doubly_list", "doubly_list_node"):
            return spec_class("doubly_list", "doubly_list_node") or "Node"
        if shape == "random_tree":
            return spec_class("random_tree") or "Node"
        return "Node"

    wanted: list[str] = []
    for shape, kinds in (
        ("list", {"list"}),
        ("tree", {"tree"}),
        ("nary", {"nary_tree", "nary_tree_nodes", "nary_tree_ref"}),
        ("quad", {"quad_tree"}),
        ("nested", {"nested"}),
        ("next_tree", {"next_tree"}),
        ("doubly_circular", {"doubly_circular"}),
        ("multi_list", {"multi_list"}),
        ("shared_list", {"circular_list", "alias_list"}),
        ("graph", {"graph"}),
        ("random_list", {"random_list"}),
        ("doubly_list", {"doubly_list", "doubly_list_node"}),
        ("random_tree", {"random_tree"}),
        ("ring_tree", {"special_tree"}),
    ):
        if structs & kinds:
            wanted.append(shape)

    blocks = []
    for shape in wanted:
        if shape == "nested":
            body = _nested_definition(language)
        else:
            cls = shape_class(shape)
            fields = _SHAPE_FIELDS[shape]
            shared = shape in _SHARED_SHAPES or (
                shape == "nary"
                and bool(structs & {"nary_tree_nodes", "nary_tree_ref"})
                and language == "rust"
            )
            builder = {
                "python": _def_python,
                "java": _def_java,
                "cpp": _def_cpp,
                "go": _def_go,
                "rust": _def_rust,
                "typescript": _def_typescript,
                "javascript": _def_javascript,
            }[language]
            body = builder(cls, fields, shared)
        blocks.append((_SHAPE_HEADERS[shape], body))
    return blocks


def _comment(lines: list[str], language: str) -> list[str]:
    if language in ("python", "rust"):
        prefix = "# " if language == "python" else "// "
        return [prefix + line if line else prefix.rstrip() for line in lines]
    return ["/*", *(" * " + line if line else " *" for line in lines), " */"]


def definition_comment(invocation: dict, language: str) -> str:
    """The LeetCode-style commented-out definitions for exactly the hidden
    types this problem uses — the starter's leading comment block."""
    blocks = _definition_blocks(invocation, language)
    if not blocks:
        return ""
    if language in ("python", "rust"):
        prefix = "# " if language == "python" else "// "
        gap = prefix.rstrip()
    else:
        gap = " *"
    lines: list[str] = []
    for index, (header, body) in enumerate(blocks):
        if index:
            lines.append(gap)
        lines.append(header)
        lines.extend(body)
    return "\n".join(_comment(lines, language)) + "\n"


def _parameters(invocation: dict) -> list[tuple[str, dict]]:
    return [
        (parameter["name"], parameter["value_type"])
        for parameter in invocation.get("parameters", [])
    ]


def generate(invocation: dict, language: str) -> str:
    if invocation.get("type", "function") == "sql":
        return "-- TODO: write a single SELECT query\nSELECT 'TODO';\n"
    if invocation.get("type", "function") == "shell":
        return "#!/usr/bin/env bash\n# TODO: read the input from stdin and write the answer to stdout\n"
    if invocation.get("type", "function") == "design":
        return _generate_design(invocation, language)
    if invocation.get("type", "function") == "interactive":
        return _generate_interactive(invocation, language)
    if invocation.get("type", "function") == "concurrent":
        return _generate_concurrent(invocation, language)
    parameters = _parameters(invocation)
    return_type = invocation.get("return_type") or {"kind": "boolean"}
    name = _entry(invocation, language)

    if language == "python3":
        rendered = [python_type(spec) for _, spec in parameters] + [
            python_type(return_type)
        ]
        blocks = [*_py_imports(rendered=rendered)]
        comment = definition_comment(invocation, "python")
        if comment:
            # LC parity: the commented-out definitions lead the file.
            blocks = [comment + "\n", *blocks] if blocks else [comment + "\n\n"]
        signature = ", ".join(
            [
                f"self",
                *(
                    f"{parameter}: {python_type(spec)}"
                    for parameter, spec in parameters
                ),
            ]
        )
        blocks.append(
            f"class Solution:\n    def {name}({signature}) -> {python_type(return_type)}:\n"
        )
        blocks.append('        raise NotImplementedError("TODO")\n')
        return "".join(blocks)

    if language == "javascript":
        lines = []
        comment = definition_comment(invocation, "javascript")
        if comment:
            lines.extend(comment.rstrip("\n").split("\n"))
            lines.append("")
        lines.append("/**")
        lines += [
            f" * @param {{{javascript_type(spec)}}} {parameter}"
            for parameter, spec in parameters
        ]
        lines.append(f" * @return {{{javascript_type(return_type)}}}")
        lines.append(" */")
        arguments = ", ".join(parameter for parameter, _ in parameters)
        lines.append(f"var {name} = function({arguments}) {{")
        lines.append('    throw new Error("TODO");')
        lines.append("};")
        return "\n".join(lines) + "\n"

    if language == "typescript":
        signature = ", ".join(
            f"{parameter}: {typescript_type(spec)}" for parameter, spec in parameters
        )
        comment = definition_comment(invocation, "typescript")
        prefix = comment + "\n" if comment else ""
        return f'{prefix}function {name}({signature}): {typescript_type(return_type)} {{\n    throw new Error("TODO");\n}}\n'

    if language == "java":
        chunks = []
        comment = definition_comment(invocation, "java")
        if comment:
            chunks.append(comment + "\n")
        body_types = [java_type(spec) for _, spec in parameters] + [
            java_type(return_type)
        ]
        if any(type_name.startswith("List<") for type_name in body_types):
            chunks.append("import java.util.List;\n\n")
        signature = ", ".join(
            f"{java_type(spec)} {parameter}" for parameter, spec in parameters
        )
        chunks.append("class Solution {\n")
        chunks.append(f"    public {java_type(return_type)} {name}({signature}) {{\n")
        chunks.append('        throw new UnsupportedOperationException("TODO");\n')
        chunks.append("    }\n}\n")
        return "".join(chunks)

    if language == "cpp":
        signature = ", ".join(
            f"{cpp_type(spec, reference=True)} {parameter}"
            for parameter, spec in parameters
        )
        comment = definition_comment(invocation, "cpp")
        prefix = comment + "\n" if comment else ""
        return (
            prefix
            + "class Solution {\n"
            "public:\n"
            f"    {cpp_type(return_type)} {name}({signature}) {{\n"
            '        throw logic_error("TODO");\n'
            "    }\n"
            "};\n"
        )

    if language == "go":
        signature = ", ".join(
            f"{parameter} {go_type(spec)}" for parameter, spec in parameters
        )
        comment = definition_comment(invocation, "go")
        prefix = comment + "\n" if comment else ""
        return f'{prefix}func {name}({signature}) {go_type(return_type)} {{\n    panic("TODO")\n}}\n'

    if language == "rust":
        chunks = []
        comment = definition_comment(invocation, "rust")
        if comment:
            chunks.append(comment + "\n")
        signature = ", ".join(
            f"{parameter}: {rust_parameter_type(invocation, spec)}"
            for parameter, spec in parameters
        )
        return_rendered = rust_return_type(invocation, return_type)
        rendered = signature + " -> " + return_rendered
        if "Rc<" in rendered or "RefCell<" in rendered:
            # Shared-ownership shapes; the bundle's own provided/rust/
            # source carries no imports, so the starter brings its own.
            chunks.append("use std::rc::Rc;\nuse std::cell::RefCell;\n\n")
        chunks.append("impl Solution {\n")
        chunks.append(f"    pub fn {name}({signature}) -> {return_rendered} {{\n")
        chunks.append('        panic!("TODO")\n')
        chunks.append("    }\n}\n")
        return "".join(chunks)

    raise ValueError(f"Unsupported language: {language}")


def _generate_design(invocation: dict, language: str) -> str:
    """Design (class) problems in every language. The class API is judged
    through the actions/params replay protocol; constructors and methods
    follow the per-language conventions the judge's design wrapper
    generates (cpp: declared class with methods; go: NewXTyped +
    methods; rust: struct + impl with new; js/ts: class with
    constructor)."""
    class_name = invocation["class_name"]
    constructor = invocation.get("constructor", {}).get("parameters", [])
    methods = invocation.get("methods", [])
    entrypoints = invocation.get("entrypoints") or {}
    constructor_names = [p["name"] for p in constructor]
    constructor_specs = [p.get("value_type") for p in constructor]

    def param_type(spec) -> str:
        """A design method parameter of kind "instance" is another live
        object of the design class itself ({"$ref": handle} on the wire,
        LC 1570's dotProduct(vec)); it renders as the class in every
        language, with the language's own reference shape."""
        if isinstance(spec, dict) and spec.get("kind") == "instance":
            return {
                "python3": class_name,
                "java": class_name,
                "cpp": f"{class_name}&",
                "go": f"*{class_name}",
                "rust": f"&mut {class_name}",
                "typescript": class_name,
            }[language]
        renderers = {
            "python3": python_type,
            "java": java_type,
            "cpp": cpp_type,
            "go": go_type,
            "rust": rust_type,
            "typescript": typescript_type,
            "javascript": typescript_type,
        }
        return renderers[language](spec)

    if language == "python3":
        blocks = list(_py_imports())
        ctor_signature = ", ".join(
            [
                "self",
                *(
                    f"{name}: {param_type(spec)}"
                    for name, spec in zip(constructor_names, constructor_specs)
                ),
            ]
        )
        blocks.append(f"class {class_name}:\n")
        blocks.append(f"    def __init__({ctor_signature}):\n")
        blocks.append('        raise NotImplementedError("TODO")\n')
        for method in methods:
            name = method["name"]
            specs = [p.get("value_type") for p in method.get("parameters", [])]
            names = [p["name"] for p in method.get("parameters", [])]
            returns = method.get("return_type")
            signature = ", ".join(
                ["self", *(f"{n}: {param_type(s)}" for n, s in zip(names, specs))]
            )
            ret = (
                ""
                if (returns is None or returns.get("kind") == "void")
                else f" -> {python_type(returns)}"
            )
            blocks.append(f"\n    def {name}({signature}){ret}:\n")
            blocks.append('        raise NotImplementedError("TODO")\n')
        return "".join(blocks)

    if language == "java":
        ctor_signature = ", ".join(
            f"{param_type(spec)} {name}"
            for name, spec in zip(constructor_names, constructor_specs)
        )
        chunks = [f"class {class_name} {{\n"]
        chunks.append(f"    public {class_name}({ctor_signature}) {{\n    }}\n")
        for method in methods:
            name = method["name"]
            specs = [p.get("value_type") for p in method.get("parameters", [])]
            names = [p["name"] for p in method.get("parameters", [])]
            returns = method.get("return_type")
            ret = (
                "void"
                if (returns is None or returns.get("kind") == "void")
                else java_type(returns)
            )
            signature = ", ".join(f"{param_type(s)} {n}" for n, s in zip(names, specs))
            chunks.append(f"\n    public {ret} {name}({signature}) {{\n    }}\n")
        chunks.append("}\n")
        return "".join(chunks)

    if language == "cpp":
        lines = [f"class {class_name} {{\n  public:\n"]
        ctor_args = ", ".join(
            f"{param_type(spec)} {name}"
            for name, spec in zip(constructor_names, constructor_specs)
        )
        lines.append(f"    {class_name}({ctor_args});\n")
        for method in methods:
            name = method["name"]
            cpp_name = entrypoints.get(f"cpp.{name}", name)
            specs = [p.get("value_type") for p in method.get("parameters", [])]
            names = [p["name"] for p in method.get("parameters", [])]
            returns = method.get("return_type")
            ret = (
                "void"
                if (returns is None or returns.get("kind") == "void")
                else cpp_type(returns)
            )
            args = ", ".join(f"{param_type(s)} {n}" for n, s in zip(names, specs))
            lines.append(f"    {ret} {cpp_name}({args});\n")
        lines.append("};\n")
        return "".join(lines)

    if language == "go":
        out = ["package main\n\n", f"type {class_name} struct{{}}\n\n"]
        ctor_args = ", ".join(
            f"{name} {param_type(spec)}"
            for name, spec in zip(constructor_names, constructor_specs)
        )
        out.append(
            f'func New{class_name}Typed({ctor_args}) *{class_name} {{\n\tpanic("TODO")\n}}\n'
        )
        for method in methods:
            name = method["name"]
            go_name = entrypoints.get(f"go.{name}", name)
            specs = [p.get("value_type") for p in method.get("parameters", [])]
            names = [p["name"] for p in method.get("parameters", [])]
            returns = method.get("return_type")
            args = ", ".join(f"{n} {param_type(s)}" for n, s in zip(names, specs))
            ret = (
                ""
                if (returns is None or returns.get("kind") == "void")
                else f" {go_type(returns)}"
            )
            out.append(
                f'\nfunc (design *{class_name}) {go_name}({args}){ret} {{\n\tpanic("TODO")\n}}\n'
            )
        return "".join(out)

    if language == "rust":
        out = [f"pub struct {class_name};\n\nimpl {class_name} {{\n"]
        ctor_args = ", ".join(
            f"{name}: {param_type(spec)}"
            for name, spec in zip(constructor_names, constructor_specs)
        )
        out.append(
            f'    pub fn new({ctor_args}) -> Self {{\n        panic!("TODO")\n    }}\n'
        )
        for method in methods:
            name = method["name"]
            rust_name = entrypoints.get(f"rust.{name}", name)
            specs = [p.get("value_type") for p in method.get("parameters", [])]
            names = [p["name"] for p in method.get("parameters", [])]
            returns = method.get("return_type")
            args = ", ".join(f"{n}: {param_type(s)}" for n, s in zip(names, specs))
            ret = (
                ""
                if (returns is None or returns.get("kind") == "void")
                else f" -> {rust_type(returns)}"
            )
            out.append(
                f'\n    pub fn {rust_name}(&mut self{", " + args if args else ""}){ret} {{\n        panic!("TODO")\n    }}\n'
            )
        out.append("}\n")
        return "".join(out)

    if language in ("javascript", "typescript"):
        typed = language == "typescript"
        ctor_args = ", ".join(
            (f"{name}: {param_type(spec)}" if typed else name)
            for name, spec in zip(constructor_names, constructor_specs)
        )
        lines = [f"class {class_name} {{\n"]
        lines.append(f"    constructor({ctor_args}) {{\n")
        if not typed:
            lines.append('        throw new Error("TODO");\n')
        lines.append("    }\n")
        for method in methods:
            name = method["name"]
            specs = [p.get("value_type") for p in method.get("parameters", [])]
            names = [p["name"] for p in method.get("parameters", [])]
            returns = method.get("return_type")
            args = ", ".join(
                (f"{n}: {param_type(s)}" if typed else n) for n, s in zip(names, specs)
            )
            ret = (
                (
                    ""
                    if (returns is None or returns.get("kind") == "void")
                    else f": {typescript_type(returns)}"
                )
                if typed
                else ""
            )
            lines.append(f"\n    {name}({args}){ret} {{\n")
            if not typed:
                lines.append('        throw new Error("TODO");\n')
            lines.append("    }\n")
        lines.append("}\n")
        return "".join(lines)

    raise ValueError(f"Unsupported language for design starters: {language}")


def _generate_concurrent(invocation: dict, language: str) -> str:
    """Concurrency problems: python3 + java only, same class shape as design.
    A parameter of kind "callback" is LeetCode's release callback — the judge
    supplies it (a zero-argument lambda / Runnable) and records the token it
    appends to the shared log. Java methods declare `throws
    InterruptedException` because every one of them may block on the schedule.
    Schema:
        {"type": "concurrent", "class_name": "H2O",
         "constructor": {"parameters": [...]},
         "methods": [{"name": "hydrogen",
                      "parameters": [{"name": "releaseHydrogen",
                                      "value_type": {"kind": "callback"}}]}]}
    """
    if language not in ("python3", "java"):
        raise ValueError(
            f"Concurrency problems support python3 and java, not {language}"
        )
    class_name = invocation["class_name"]
    constructor = invocation.get("constructor", {}).get("parameters", [])
    methods = invocation.get("methods", [])
    parameters = constructor + [
        parameter for method in methods for parameter in method.get("parameters", [])
    ]
    callbacks = any(
        _kind(parameter["value_type"]) == "callback" for parameter in parameters
    )

    if language == "python3":
        blocks = [*_py_imports(callbacks), f"class {class_name}:\n"]

        def signature(specs: list[dict]) -> str:
            return ", ".join(
                [
                    "self",
                    *(
                        f"{parameter['name']}: "
                        + (
                            "Callable[[], None]"
                            if _kind(parameter["value_type"]) == "callback"
                            else python_type(parameter["value_type"])
                        )
                        for parameter in specs
                    ),
                ]
            )

        blocks.append(f"    def __init__({signature(constructor)}) -> None:\n")
        blocks.append('        raise NotImplementedError("TODO")\n')
        for method in methods:
            returns = (
                python_type(method["return_type"])
                if method.get("return_type")
                else "None"
            )
            blocks.append(
                f"\n    def {method['name']}({signature(method.get('parameters', []))}) -> {returns}:\n"
            )
            blocks.append('        raise NotImplementedError("TODO")\n')
        return "".join(blocks)

    # java
    chunks = []
    if any(
        _contains_struct(parameter["value_type"])
        for parameter in parameters
        if _kind(parameter["value_type"]) != "callback"
    ):
        chunks.append("import java.util.List;\n\n")
    chunks.append(f"class {class_name} {{\n")

    def java_signature(specs: list[dict]) -> str:
        return ", ".join(
            (
                "Runnable"
                if _kind(parameter["value_type"]) == "callback"
                else java_type(parameter["value_type"])
            )
            + f" {parameter['name']}"
            for parameter in specs
        )

    chunks.append(f"    public {class_name}({java_signature(constructor)}) {{\n")
    chunks.append('        throw new UnsupportedOperationException("TODO");\n')
    chunks.append("    }\n")
    for method in methods:
        returns = (
            java_type(method["return_type"]) if method.get("return_type") else "void"
        )
        chunks.append(
            f"\n    public {returns} {method['name']}({java_signature(method.get('parameters', []))})"
            " throws InterruptedException {\n"
        )
        chunks.append('        throw new UnsupportedOperationException("TODO");\n')
        chunks.append("    }\n")
    chunks.append("}\n")
    return "".join(chunks)


def _generate_interactive(invocation: dict, language: str) -> str:
    """Interactive problems: the solution method receives an oracle object
    (the problem's provided/ sources, assembled by the judge), plus any
    auxiliary arguments declared in invocation["parameters"]. All seven
    languages. The oracle type and parameter come from the required,
    bundle-owned invocation.provided.oracle declaration; per-language method
    names come from entrypoints. Schema:
    {"type": "interactive", "class_name", "method", "entrypoints"?,
    "oracle", "oracle_methods": [...], "parameters": [...auxiliary...],
    "return_type", "query_limit"?}. A void method declares
    {"kind": "void"} and is judged by the oracle's verdict()."""
    provided = (invocation.get("provided") or {}).get("oracle")
    if not isinstance(provided, dict):
        raise ValueError("Interactive problems must declare invocation.provided.oracle")
    oracle = provided.get("class")
    if not isinstance(oracle, str) or not oracle:
        raise ValueError("invocation.provided.oracle.class must be a non-empty string")
    parameter = (provided.get("parameter") or oracle[0].lower() + oracle[1:]).lstrip(
        "_"
    ) or "oracle"
    class_name = invocation["class_name"]
    entrypoints = invocation.get("entrypoints") or {}
    method = entrypoints.get(language, invocation["method"])
    auxiliary = [
        (parameter_["name"], parameter_["value_type"])
        for parameter_ in invocation.get("parameters", [])
    ]
    returns = invocation.get("return_type") or {"kind": "integer", "bits": 32}
    is_void = returns.get("kind") == "void"

    if language == "python3":
        signature = ", ".join(
            [
                "self",
                f"{parameter}: {oracle}",
                *(f"{name}: {python_type(spec)}" for name, spec in auxiliary),
            ]
        )
        blocks = list(_py_imports())
        blocks.append(f"class {class_name}:\n")
        blocks.append(
            f"    def {method}({signature}) -> {'None' if is_void else python_type(returns)}:\n"
        )
        blocks.append('        raise NotImplementedError("TODO")\n')
        return "".join(blocks)

    if language == "java":
        # An out_buffer parameter is the judge-allocated char[] wire: the
        # java harness hard-codes the buffer element (the read4 wire), so
        # the starter's signature names char[] rather than value_type.
        signature = ", ".join(
            [f"{oracle} {parameter}"]
            + [
                f"{'char[]' if parameter_.get('out_buffer') is not None else java_type(parameter_['value_type'])} {parameter_['name']}"
                for parameter_ in invocation.get("parameters", [])
            ]
        )
        chunks = [f"class {class_name} {{\n"]
        chunks.append(
            f"    public {'void' if is_void else java_type(returns)} {method}({signature}) {{\n"
        )
        chunks.append('        throw new UnsupportedOperationException("TODO");\n')
        chunks.append("    }\n}")
        return "".join(chunks)

    if language == "cpp":
        # An out_buffer parameter must be a reference: the wrapper captures
        # the buffer the submission writes into.
        def cpp_auxiliary(name: str, spec: dict) -> str:
            reference = "&" if invocation_out_buffers.get(name) else ""
            return f"{cpp_type(spec, reference=bool(reference))} {name}"

        invocation_out_buffers = {
            parameter_["name"]: parameter_.get("out_buffer") is not None
            for parameter_ in invocation.get("parameters", [])
            if isinstance(parameter_, dict)
        }
        signature = ", ".join(
            [
                f"{oracle}& {parameter}",
                *(cpp_auxiliary(name, spec) for name, spec in auxiliary),
            ]
        )
        blocks = [f"class {oracle};\n\n"]
        blocks.append(f"class {class_name} {{\npublic:\n")
        blocks.append(
            f"    {'void' if is_void else cpp_type(returns)} {method}({signature});\n"
        )
        blocks.append("};\n")
        return "".join(blocks)

    if language == "go":
        go_method = entrypoints.get("go", method)
        signature = ", ".join(
            [
                f"{parameter} *{oracle}",
                *(f"{name} {go_type(spec)}" for name, spec in auxiliary),
            ]
        )
        return (
            "package main\n\n"
            f"type {class_name} struct{{}}\n\n"
            f"func (solution *{class_name}) {go_method}({signature}) {'void' if is_void else go_type(returns)} {{\n"
            '\tpanic("TODO")\n'
            "}\n"
        )

    if language == "rust":
        rust_method = entrypoints.get("rust", method)
        # An out_buffer parameter is handed over as &mut: the wrapper
        # captures the buffer the submission writes into.
        rust_out_buffers = {
            parameter_["name"]
            for parameter_ in invocation.get("parameters", [])
            if isinstance(parameter_, dict) and parameter_.get("out_buffer") is not None
        }
        signature = ", ".join(
            [
                f"{parameter}: &mut {oracle}",
                *(
                    f"{name}: {'&mut ' if name in rust_out_buffers else ''}{rust_type(spec)}"
                    for name, spec in auxiliary
                ),
            ]
        )
        return (
            f"impl {class_name} {{\n"
            f"    pub fn {rust_method}({signature}) -> {'()' if is_void else rust_type(returns)} {{\n"
            '        panic!("TODO")\n'
            "    }\n"
            "}\n"
        )

    if language in ("javascript", "typescript"):
        signature = ", ".join([parameter, *(name for name, _ in auxiliary)])
        typed = ""
        if language == "typescript":
            signature = ", ".join(
                [
                    f"{parameter}: {oracle}",
                    *(f"{name}: {typescript_type(spec)}" for name, spec in auxiliary),
                ]
            )
            typed = f": {'void' if is_void else typescript_type(returns)}"
        return (
            f"class {class_name} {{\n"
            f"    {method}({signature}){typed} {{\n"
            '        throw new Error("TODO");\n'
            "    }\n"
            "}\n"
        )

    raise ValueError(f"Unsupported language for interactive starters: {language}")


def _uses_json_kind(invocation: dict) -> bool:
    """Whether the json kind appears anywhere in the typed shape tree.
    The judge's renderers reject it outside JavaScript/TypeScript, so
    json bundles carry starters for exactly those two languages."""

    def walk(spec) -> bool:
        if not isinstance(spec, dict):
            return False
        if spec.get("kind") == "json":
            return True
        return walk(spec.get("items"))

    specs = [
        parameter.get("value_type") for parameter in invocation.get("parameters", [])
    ]
    specs.append(invocation.get("return_type"))
    return any(walk(spec) for spec in specs)


def _leading_comment(invocation: dict, language: str, code: str) -> str:
    """Prepend the LC-style definition comment to design/interactive/
    concurrent starters (the function path emits it inline, ahead of the
    imports)."""
    comment = definition_comment(
        invocation, "python" if language == "python3" else language
    )
    if not comment:
        return code
    return comment + ("\n" if code.startswith("package") is False else "") + code


def starter_files(invocation: dict) -> dict[str, str]:
    invocation_type = invocation.get("type", "function")
    if invocation_type == "sql":
        return {"sql": generate(invocation, "sql")}
    if invocation_type == "shell":
        return {"shell": generate(invocation, "shell")}
    if invocation_type == "design":
        return {
            language: _leading_comment(invocation, language, generate(invocation, language))
            for language in FUNCTION_LANGUAGES
        }
    if invocation_type == "interactive":
        return {
            language: _leading_comment(invocation, language, generate(invocation, language))
            for language in FUNCTION_LANGUAGES
        }
    if invocation_type == "concurrent":
        return {
            language: _leading_comment(invocation, language, generate(invocation, language))
            for language in ("python3", "java")
        }
    languages = (
        ("javascript", "typescript")
        if _uses_json_kind(invocation)
        else FUNCTION_LANGUAGES
    )
    return {language: generate(invocation, language) for language in languages}


def main() -> None:
    arguments = sys.argv[1:]
    check_only = "--check" in arguments
    style = next(
        (
            argument.split("=", 1)[1]
            for argument in arguments
            if argument.startswith("--style=")
        ),
        None,
    )
    targets = [
        Path(argument) for argument in arguments if not argument.startswith("--")
    ]
    root = Path(__file__).resolve().parent.parent
    if not targets:
        # bundle dirs flat or inside the 100-id shards
        targets = sorted(
            child if (child / "problem.json").is_file() else sub
            for tree in ("problems",)
            for child in root.glob(f"{tree}/*")
            if child.is_dir() and not child.name.startswith(".")
            for sub in (
                [child]
                if (child / "problem.json").is_file()
                else sorted(child.iterdir())
            )
            if sub.is_dir() and (sub / "problem.json").is_file()
        )
    failures = 0
    for bundle in targets:
        # Style follows the bundle's provenance unless --style is given:
        # bettercode-derived slugs are modern, extend-derived ones legacy.
        set_python_style(resolve_python_style(style, bundle.name.split("_", 1)[1]))
        problem = json.loads((bundle / "problem.json").read_text(encoding="utf-8"))
        generated = starter_files(problem["invocation"])
        extension_language = {extension: key for key, extension in EXTENSIONS.items()}
        present_languages = {
            extension_language[path.name[len("starter.") :]]
            for path in bundle.glob("starter.*")
            if path.name[len("starter.") :] in extension_language
            and extension_language[path.name[len("starter.") :]] in generated
        }
        # Existing starters define the languages an authored bundle offers
        # (FORMAT.md). A brand-new bundle with none still gets the invocation's
        # complete default set.
        expected = (
            {
                language: generated[language]
                for language in generated
                if language in present_languages
            }
            if present_languages
            else generated
        )
        for language, content in expected.items():
            # post-generation formatting with the pinned toolchain (see
            # FORMAT.md); tolerant so generation works without every tool
            # installed — CI's format check is the hard gate
            content = format_content(EXTENSIONS[language], content, tolerant=True)
            path = bundle / f"starter.{EXTENSIONS[language]}"
            if check_only:
                if not path.exists() or path.read_text(encoding="utf-8") != content:
                    failures += 1
                    print(f"STALE {path}")
            else:
                path.write_text(content, encoding="utf-8")
        # Remove starters that the invocation cannot generate. Languages absent
        # from an existing bundle are intentionally unoffered, not stale.
        for stale in bundle.glob("starter.*"):
            language = extension_language.get(stale.name[len("starter.") :])
            if language is None or language not in generated:
                if check_only:
                    failures += 1
                    print(f"STALE {stale}")
                else:
                    stale.unlink()
                    print(f"REMOVED {stale}")
        if not check_only:
            print(f"OK   {bundle.name}: {len(expected)} starters")
    raise SystemExit(1 if failures else 0)


if __name__ == "__main__":
    main()
