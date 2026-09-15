"""The hidden array (problem-provided oracle).

Ships with the problem, assembled into every submission's namespace by
the judge, never editable in the editor: `compareSub(l, r, x, y)`
compares the sum of `arr[l..r]` with the sum of `arr[x..y]`, under a
20-call budget; `length()` reports the array size for free. This file
is the implementation; solvers see only the public API documented in
the starter.
"""


class ArrayReader:
    def __init__(self, arr: list[int], budget: int):
        self.arr = arr
        self.budget = budget

    def compareSub(self, l: int, r: int, x: int, y: int) -> int:  # noqa: N802 — LeetCode API
        if self.budget <= 0:
            raise RuntimeError("ArrayReader query budget exhausted")
        self.budget -= 1
        left = sum(self.arr[l : r + 1])
        right = sum(self.arr[x : y + 1])
        if left > right:
            return 1
        if left < right:
            return -1
        return 0

    def length(self) -> int:
        return len(self.arr)
