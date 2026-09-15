from typing import List


class Solution:
    def minOperationsToMakeMedianK(self, nums: List[int], k: int) -> int:
        # After sorting, the median slot is n // 2: the middle element for
        # odd n and the larger of the two middles for even n, matching the
        # statement's definition. Each element left of that slot that
        # exceeds k must be pushed down to k (every unit costs one op) or
        # it would force the median above k; each element right of it
        # below k must be raised. The total reaches 10**14 scale at the
        # constraint maximum -- far beyond 32-bit.
        nums.sort()
        mid = len(nums) // 2
        total = abs(nums[mid] - k)
        for i in range(mid):
            if nums[i] > k:
                total += nums[i] - k
        for i in range(mid + 1, len(nums)):
            if nums[i] < k:
                total += k - nums[i]
        return total
