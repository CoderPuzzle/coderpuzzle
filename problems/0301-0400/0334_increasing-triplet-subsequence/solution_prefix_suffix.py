from typing import List


class Solution:
    def increasingTriplet(self, nums: List[int]) -> bool:
        n = len(nums)
        if n < 3:
            return False
        # left_min[j]: smallest value strictly before j; right_max[j]:
        # largest value strictly after j. The sentinel ends can never
        # satisfy the check, so every position tests uniformly.
        left_min = [float("inf")] * n
        right_max = [float("-inf")] * n
        for j in range(1, n):
            left_min[j] = min(left_min[j - 1], nums[j - 1])
        for j in range(n - 2, -1, -1):
            right_max[j] = max(right_max[j + 1], nums[j + 1])
        for j in range(n):
            if left_min[j] < nums[j] < right_max[j]:
                return True
        return False
