"""The guess API (problem-provided oracle).

Ships with the problem, assembled into every submission's namespace by
the judge, never editable in the editor: `guess(num)` reports how the
number it was given compares to the case's hidden pick — above it, below
it, or exactly it. This file is the implementation; solvers see only the
public API documented in the starter.
"""


class Guess:
    def __init__(self, pick: int, budget: int):
        self.pick = pick
        self.budget = budget

    def guess(self, num: int) -> int:
        if self.budget <= 0:
            raise RuntimeError("Guess query budget exhausted")
        self.budget -= 1
        if num > self.pick:
            return -1
        if num < self.pick:
            return 1
        return 0
