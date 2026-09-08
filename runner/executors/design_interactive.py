"""Design-kind wrappers for the five compiled/dynamic languages.

The design protocol (see python_harness._invoke_design /
CoderPuzzleJavaHarness.invokeDesign) is: a case carries `actions` (method
names, or {"call", "repeat"} for randomized methods) and `params` (an
argument list per action; params[0] builds the instance). Each action's
decoded result is recorded; a {"$prev"} argument pipes the previous
raw result into the next call; a randomized action reports a frequency
table over its repeated results.

That replay loop lives in the *generated wrapper* for these languages,
written per problem from the invocation's method table. The case
travels as one tagged stream (executors/typed.py): actions as a tagged
string array (or object rows for randomized calls), then params rows,
each a tagged array whose elements are tagged values; the wrapper
decodes with the generic reader, converts per-parameter via the
invocation's codecs when a method needs a typed value (python3/js/ts
consume the raw values directly), and emits the recorded outputs as a
JSON array on the result channel.

A per-language shim object (`OjDesign`) provides decode-by-codec where
the language needs typed values (cpp/go/rust); python-style languages
pass raw values through, mirroring the python harness.
"""
from __future__ import annotations

from pathlib import Path
from typing import Any

from .base import ExecutorError, PreparedProgram


def encode_design_case(invocation: dict[str, Any], case_input: Any) -> bytes:
    """One tagged stream: actions, then params rows."""
    from .typed import encode_tagged

    if not isinstance(case_input, dict):
        raise ExecutorError("Design input must be an object")
    actions = case_input.get("actions")
    params = case_input.get("params")
    if not isinstance(actions, list) or not isinstance(params, list) or len(actions) != len(params):
        raise ExecutorError("Design input requires equally sized actions and params")
    return encode_tagged(actions, "actions") + encode_tagged(params, "params")
