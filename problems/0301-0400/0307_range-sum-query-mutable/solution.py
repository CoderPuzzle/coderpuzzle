from typing import List


class NumArray:
    def __init__(self, nums: List[int]) -> None:
        self.n = len(nums)
        self.nums = list(nums)
        # Fenwick tree, 1-based: slot i holds the sum of the block of length
        # i & -i ending at i. Slot 0 stays unused so low-bit walks terminate.
        self.tree = [0] * (self.n + 1)
        # O(n) build: once a block sum is finished, push it straight into
        # its parent's slot — one pass instead of n updates.
        for index, value in enumerate(nums, 1):
            self.tree[index] += value
            parent = index + (index & -index)
            if parent <= self.n:
                self.tree[parent] += self.tree[index]

    def update(self, index: int, val: int) -> None:
        # Only the delta is applied; nums keeps current values so the next
        # delta is computed correctly.
        delta = val - self.nums[index]
        self.nums[index] = val
        # Climb by the low bit to visit every block containing this cell.
        position = index + 1
        while position <= self.n:
            self.tree[position] += delta
            position += position & -position

    def sumRange(self, left: int, right: int) -> int:
        # A range sum is the difference of two prefix sums.
        return self._prefix(right + 1) - self._prefix(left)

    def _prefix(self, count: int) -> int:
        total = 0
        # Each step lands on a disjoint block whose union is exactly the
        # first `count` elements — O(log n) of them.
        while count > 0:
            total += self.tree[count]
            count -= count & -count
        return total
