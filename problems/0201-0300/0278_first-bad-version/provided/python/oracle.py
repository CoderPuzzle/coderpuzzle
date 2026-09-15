"""The bad-version API (problem-provided oracle).

Ships with the problem, assembled into every submission's namespace by
the judge, never editable in the editor: `isBadVersion(version)` reports
whether `version` fails the quality check — every version from the
case's hidden first bad one onward does. This file is the
implementation; solvers see only the public API documented in the
starter.
"""


class VersionControl:
    def __init__(self, bad: int, budget: int):
        self.bad = bad
        self.budget = budget

    def isBadVersion(self, version: int) -> bool:  # noqa: N802 — LeetCode API
        if self.budget <= 0:
            raise RuntimeError("VersionControl query budget exhausted")
        self.budget -= 1
        return version >= self.bad
