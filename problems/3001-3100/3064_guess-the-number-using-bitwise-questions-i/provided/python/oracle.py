"""The common-set-bits API (problem-provided oracle).

Ships with the problem, assembled into every submission's namespace by
the judge, never editable in the editor: `commonSetBits(num)` returns how
many bits the number it was given shares with the case's hidden n — the
popcount of their bitwise AND. This file is the implementation; solvers
see only the public API documented in the statement.
"""


class HiddenNumber:
    def __init__(self, n: int, budget: int):
        self.n = n
        self.budget = budget

    def commonSetBits(self, num: int) -> int:
        if self.budget <= 0:
            raise RuntimeError("HiddenNumber query budget exhausted")
        self.budget -= 1
        return bin(self.n & num).count("1")
