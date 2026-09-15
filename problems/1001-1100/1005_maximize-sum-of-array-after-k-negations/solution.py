from typing import List


class Solution:
    def largestSumAfterKNegations(self, nums: List[int], k: int) -> int:
        # Sort so the most negative values lead, then spend operations on
        # them first — flipping the most negative value always raises the
        # sum by the most. Stop as soon as either k runs out or the walk
        # reaches a nonnegative value.
        nums = sorted(nums)
        i = 0
        n = len(nums)
        while i < n and nums[i] < 0 and k > 0:
            nums[i] = -nums[i]
            k -= 1
            i += 1
        total = sum(nums)
        # Any leftover operations only matter by parity: flipping the same
        # value twice restores it. An odd leftover must land somewhere, and
        # the cheapest place is the smallest absolute value in the array —
        # scanning the whole array (not just the untouched suffix) also
        # covers a zero sitting among the values, which absorbs the flip
        # for free no matter how many operations remain.
        if k % 2 == 1:
            total -= 2 * min(abs(x) for x in nums)
        return total
