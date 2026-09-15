class Solution:
    def countSubarrays(self, nums: List[int]) -> int:
        # run[i] counts strictly increasing subarrays ending at i: it is
        # run[i-1] + 1 when the rise continues, else 1. Summing counts
        # every subarray exactly once, by its right endpoint.
        total = 0
        run = 0
        for i, value in enumerate(nums):
            if i > 0 and nums[i - 1] < value:
                run += 1
            else:
                run = 1
            total += run
        return total
