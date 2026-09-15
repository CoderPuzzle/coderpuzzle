from typing import List


class Solution:
    def incremovableSubarrayCount(self, nums: List[int]) -> int:
        # A subarray (i, j) is incremovable exactly when splicing it out
        # leaves a strictly increasing sequence. n <= 50, so every one of
        # the O(n^2) subarrays is checked directly: walk the surviving
        # elements (prefix nums[:i] then suffix nums[j+1:]) and require
        # each one to exceed its predecessor; values are positive, so a
        # sentinel of 0 seeds the comparison.
        n = len(nums)
        count = 0
        for i in range(n):
            for j in range(i, n):
                ok = True
                prev = 0
                for idx in list(range(i)) + list(range(j + 1, n)):
                    if nums[idx] <= prev:
                        ok = False
                        break
                    prev = nums[idx]
                if ok:
                    count += 1
        return count
