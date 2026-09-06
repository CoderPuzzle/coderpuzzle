"""Tamper-scan: flag submissions that inspect or patch provided code.

Never fatal — the findings ride alongside the judge result as warnings
and change no verdict (verdicts are decided server-side against frozen
cases; see docs/TRUST-BOUNDARIES.md). The protected-symbol set is
derived from the bundle's own `provided/` sources per language, so no
per-bundle configuration exists.

Detection is intentionally limited to high-confidence patterns:

- python (AST): rebinding or attribute-writes to provided classes and
  modules, `setattr` on them, user redefinition of provided class and
  function names, `open()` reads of provided file paths, imports of
  provided modules, `inspect.getsource` / `dis` introspection, and
  name-mangled private access (`_Cls__attr`).
- javascript / typescript (regex): prototype writes and `Object.assign`
  on provided prototypes, rebinding of provided class names,
  `__proto__` reach-through.
- java (regex): `setAccessible(true)` and `getDeclaredField` —
  reflection against the harness's private state.

Compiled languages (cpp, go, rust) are inherently protected: their
provided sources compile into the binary and never ship as readable
source inside the sandbox, so no scan runs for them.
"""

from __future__ import annotations

import ast
import re

# Attribute names whose disclosure would answer the problem — from the
# corpus sweep's classification of state-bearing provided code (0843's
# secret, plus the password/hidden-target family). Reads AND writes of
# these are flagged in every scanned language.
STATE_ATTR = re.compile(r"(secret|password|hidden_word|target_word|answer_key)", re.I)

_JS_DECL = re.compile(r"\b(?:class|function)\s+([A-Za-z_$][\w$]*)")
_JS_LET = re.compile(r"\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=")
_JAVA_CLASS = re.compile(r"\b(?:class|interface)\s+([A-Za-z_]\w*)")


def protected_names(provided_files: dict[str, str]) -> dict[str, list[str]]:
    """Derive the protected-symbol set from a bundle's provided sources.

    `provided_files` maps filename -> source for ONE language (the
    caller picks the language when it builds the assembly). Returns
    {"names": [top-level symbols + file stems], "attributes": [instance
    attributes declared on provided classes]}.
    """
    names: list[str] = []
    attributes: list[str] = []
    for filename, source in sorted(provided_files.items()):
        stem = filename.rsplit(".", 1)[0]
        names.append(stem)
        if filename.endswith(".py"):
            try:
                tree = ast.parse(source)
            except SyntaxError:
                continue
            for node in tree.body:
                if isinstance(node, ast.ClassDef):
                    names.append(node.name)
                    for stmt in ast.walk(node):
                        targets = []
                        if isinstance(stmt, ast.Assign):
                            targets = stmt.targets
                        elif isinstance(stmt, (ast.AnnAssign, ast.AugAssign)):
                            targets = [stmt.target]
                        for target in targets:
                            if (
                                isinstance(target, ast.Attribute)
                                and isinstance(target.value, ast.Name)
                                and target.value.id == "self"
                            ):
                                attributes.append(target.attr)
                elif isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                    names.append(node.name)
        else:
            names += _JS_DECL.findall(source)
            names += _JS_LET.findall(source)
    return {
        "names": sorted({n for n in names if len(n) >= 3}),
        "attributes": sorted({a for a in attributes if len(a) >= 3}),
    }


def _py_findings(code: str, names: list[str], attributes: list[str]) -> list[str]:
    findings: list[str] = []
    try:
        tree = ast.parse(code)
    except SyntaxError:
        return findings
    name_set = set(names)
    attr_set = set(attributes)

    def mentions_provided(node: ast.expr) -> bool:
        try:
            text = ast.unparse(node)
        except Exception:  # noqa: BLE001 — unparse is best-effort
            return False
        return any(re.search(rf"\b{re.escape(n)}\b", text) for n in names)

    for node in ast.walk(tree):
        # setattr(Provided, ...) / setattr(Provided_instance, ...) —
        # including through casts like setattr(type(oracle), ...)
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == "setattr":
            if node.args and mentions_provided(node.args[0]):
                findings.append(f"setattr on a provided symbol ({ast.unparse(node.args[0])[:60]})")
        # reads or writes of a state-bearing attribute (e.g. oracle.secret)
        if isinstance(node, ast.Attribute) and STATE_ATTR.search(node.attr):
            findings.append(f"touches state-bearing attribute '.{node.attr}'")
        # rebinding or attribute-write on a provided name
        if isinstance(node, ast.Assign):
            for target in node.targets:
                if isinstance(target, ast.Name) and target.id in name_set:
                    findings.append(f"rebinds provided symbol '{target.id}'")
                if (
                    isinstance(target, ast.Attribute)
                    and isinstance(target.value, ast.Name)
                    and target.value.id in name_set
                ):
                    findings.append(f"writes attribute '{target.attr}' on provided symbol '{target.value.id}'")
        # __dict__ / vars() reach-through onto provided symbols
        if isinstance(node, ast.Attribute) and node.attr == "__dict__":
            findings.append("'__dict__' reach-through")
        # user redefinition of a provided class or function
        if isinstance(node, (ast.ClassDef, ast.FunctionDef, ast.AsyncFunctionDef)) and node.name in name_set:
            findings.append(f"redefines provided symbol '{node.name}'")
        # open() reads touching provided file paths
        if (
            isinstance(node, ast.Call)
            and isinstance(node.func, ast.Name)
            and node.func.id == "open"
            and node.args
            and isinstance(node.args[0], ast.Constant)
            and isinstance(node.args[0].value, str)
        ):
            literal = node.args[0].value
            if "provided/" in literal or any(stem in literal for stem in names):
                findings.append(f"opens a provided source path ({literal!r})")
        # name-mangled private access: _Cls__attr
        if isinstance(node, ast.Attribute) and re.fullmatch(r"_\w+__\w+", node.attr):
            findings.append(f"name-mangled private access '.{node.attr}'")
        # introspection tooling
        if isinstance(node, ast.Import):
            for alias in node.names:
                if alias.name in {"dis", "gc"} and name_set:
                    findings.append(f"imports '{alias.name}' (introspection tooling)")
        if (
            isinstance(node, ast.Call)
            and isinstance(node.func, ast.Attribute)
            and isinstance(node.func.value, ast.Name)
            and node.func.value.id == "inspect"
            and node.func.attr in {"getsource", "getsourcelines", "getmembers"}
        ):
            findings.append(f"inspect.{node.func.attr} introspection call")
        # reads of declared provided-class attributes reached through a
        # name-mangled or underscore-prefixed path (e.g. oracle._secret)
        if (
            isinstance(node, ast.Attribute)
            and node.attr in attr_set
            and node.attr.startswith("_")
        ):
            findings.append(f"reads private attribute '.{node.attr}'")
    return findings


def _js_findings(code: str, names: list[str]) -> list[str]:
    findings: list[str] = []
    for name in names:
        escaped = re.escape(name)
        if re.search(rf"{escaped}\s*\.\s*prototype\s*\.", code):
            findings.append(f"writes to '{name}.prototype'")
        if re.search(rf"Object\.assign\(\s*{escaped}\s*\.prototype", code):
            findings.append(f"Object.assign into '{name}.prototype'")
        if re.search(rf"(?<!\bclass\s)(?<!\bfunction\s)(?<!\bnew\s)(?<!\w\.)(?<!\w)({escaped})\s*=(?!=)", code):
            findings.append(f"rebinds provided symbol '{name}'")
    if "__proto__" in code:
        findings.append("reaches through '__proto__'")
    return findings


def _java_findings(code: str, names: list[str]) -> list[str]:
    findings: list[str] = []
    if re.search(r"setAccessible\s*\(\s*true\s*\)", code):
        findings.append("setAccessible(true) reflection")
    if re.search(r"getDeclared(Field|Method)\s*\(", code):
        findings.append("getDeclared* reflection")
    return findings


def scan(
    code: str,
    language: str,
    protected: dict[str, list[str]] | None,
) -> list[str]:
    """Flag likely tampering with provided code; never raises, never gates.

    `protected` is the symbol set from protected_names() for this
    bundle+language. Returns warning strings (possibly empty).
    """
    if not protected:
        return []
    names = protected["names"]
    attributes = protected.get("attributes", [])
    if language == "python3":
        return _py_findings(code, names, attributes)
    if language in {"javascript", "typescript"}:
        return _js_findings(code, names)
    if language == "java":
        return _java_findings(code, names)
    return []  # compiled languages: implementations never ship as source
