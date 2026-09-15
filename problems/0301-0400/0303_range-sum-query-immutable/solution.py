from typing import List


class NumArray:
    def __init__(self, nums: List[int]) -> None:
        # prefix[i] = sum of the first i elements, with prefix[0] = 0 so
        # no query needs a special case for a left edge of zero.
        self.prefix = [0] * (len(nums) + 1)
        # One left-to-right pass; each entry extends the previous by one
        # element. The array is fixed, so summing happens once, not per
        # query.
        for index, value in enumerate(nums):
            self.prefix[index + 1] = self.prefix[index] + value

    def sumRange(self, left: int, right: int) -> int:
        # The elements before left cancel, telescoping the range sum
        # into a difference of two prefixes — O(1) per query.
        return self.prefix[right + 1] - self.prefix[left]
