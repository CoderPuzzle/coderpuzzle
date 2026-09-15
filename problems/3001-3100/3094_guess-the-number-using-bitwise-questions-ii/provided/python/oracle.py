"""The mutating hidden-number API (problem-provided oracle).

Ships with the problem, assembled into every submission's namespace by
the judge, never editable in the editor: `commonBits(num)` counts how
many of the low 30 bits of the CURRENT number agree with `num`, then
flips those bits (`n ^= num`), and reports the count. The instance is
fresh per case, seeded with the case's initial `n`. This file is the
implementation; solvers see only the public API documented in the
starter.
"""

_LOW_30 = (1 << 30) - 1


class CommonBits:
    def __init__(self, n: int, budget: int):
        self.initial = n
        self.n = n
        self.budget = budget

    def commonBits(self, num: int) -> int:
        if self.budget <= 0:
            raise RuntimeError("CommonBits query budget exhausted")
        self.budget -= 1
        diff = (self.n ^ num) & _LOW_30
        self.n ^= num
        return 30 - bin(diff).count("1")
