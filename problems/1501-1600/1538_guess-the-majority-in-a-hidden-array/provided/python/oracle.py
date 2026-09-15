"""The hidden binary array (problem-provided oracle).

Ships with the problem, assembled into every submission's namespace by
the judge, never editable in the editor: `query(a, b, c, d)` reports how
the four entries at those indices split — `4` when all four match, `2`
for a 3-1 split, `0` for a 2-2 split — and `length()` reports the
array's size. The oracle enforces the problem's own `2n` query budget
itself, independent of whatever budget the harness supplies. This file
is the implementation; solvers see only the public API documented in
the starter.
"""


class ArrayReader:
    def __init__(self, nums: list[int], budget: int):
        self.nums = nums
        self.budget = 2 * len(nums)

    def query(self, a: int, b: int, c: int, d: int) -> int:
        if self.budget <= 0:
            raise RuntimeError("ArrayReader query budget exhausted")
        self.budget -= 1
        ones = self.nums[a] + self.nums[b] + self.nums[c] + self.nums[d]
        if ones == 0 or ones == 4:
            return 4
        if ones == 1 or ones == 3:
            return 2
        return 0

    def length(self) -> int:
        return len(self.nums)
