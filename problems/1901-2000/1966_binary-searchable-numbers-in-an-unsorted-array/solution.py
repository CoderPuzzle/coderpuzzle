from typing import List


class Solution:
    def binarySearchableNumbers(self, nums: List[int]) -> int:
        # A value is guaranteed found iff every element left of it is
        # smaller and every element right of it is larger, so a smaller
        # right pivot or a larger left pivot can never discard it. Compare
        # each value against a running prefix max and a precomputed suffix
        # min.
        n = len(nums)
        suffix_min = [0] * n
        suffix_min[n - 1] = nums[n - 1]
        for i in range(n - 2, -1, -1):
            suffix_min[i] = min(nums[i], suffix_min[i + 1])
        count = 0
        prefix_max = nums[0]
        for i in range(n):
            if (i == 0 or nums[i] > prefix_max) and (i == n - 1 or nums[i] < suffix_min[i + 1]):
                count += 1
            if nums[i] > prefix_max:
                prefix_max = nums[i]
        return count
