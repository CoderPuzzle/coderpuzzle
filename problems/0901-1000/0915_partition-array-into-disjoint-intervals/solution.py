from typing import List


class Solution:
    def partitionDisjoint(self, nums: List[int]) -> int:
        # Suffix minima: min_from[i] is the minimum of nums[i:], built
        # right to left so each step reuses the suffix behind it.
        n = len(nums)
        min_from = [0] * n
        min_from[-1] = nums[-1]
        for i in range(n - 2, -1, -1):
            min_from[i] = min(nums[i], min_from[i + 1])
        # Prefix max sweep: the first cut whose left max clears the
        # right min is the smallest valid left.
        max_to = nums[0]
        for i in range(1, n):
            if max_to <= min_from[i]:
                return i
            if nums[i] > max_to:
                max_to = nums[i]
        # Unreachable on valid input: the guarantee says a cut exists.
        return n - 1
