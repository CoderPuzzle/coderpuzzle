"""The judge protocol line: submission-facing harnesses in every
scripting language emit their verdict on this one channel."""

import json
import sys

# The judge protocol line prefers the dedicated protocol fd so submission
# code cannot forge verdicts on stdout; it falls back to stdout when the fd
# is absent (local authoring tooling runs harnesses without it).
PROTOCOL_FD = 63

PROTOCOL_PREFIX = "__CODERPUZZLE_RESULT__"

# The only statuses a harness can legitimately report.
_PROTOCOL_STATUSES = {"completed", "runtime_error"}


def emit_protocol(line: str) -> None:
    import os

    payload = (line + "\n").encode("utf-8")
    try:
        os.write(PROTOCOL_FD, payload)
    except OSError:
        sys.stdout.write(line + "\n")


def parse_protocol(output: str) -> dict:
    """Parse the protocol line out of captured output.

    The judge takes the LAST parseable protocol line — submission stdout
    can contain earlier lines that merely start with the marker, and the
    stdout fallback channel makes that routine — and only accepts the two
    statuses a harness can legitimately report. Every consumer of protocol
    output (worker, CLI judge/run, verify_solution) parses through here so
    a verdict means the same thing everywhere."""
    for line in reversed(output.splitlines()):
        if line.startswith(PROTOCOL_PREFIX):
            try:
                data = json.loads(line[len(PROTOCOL_PREFIX) :])
            except json.JSONDecodeError:
                continue
            if isinstance(data, dict) and data.get("status") in _PROTOCOL_STATUSES:
                return data
    return {"status": "runtime_error", "error": "Solution did not produce a valid judge response"}
