from typing import List


class Solution:
    def smallestRangeII(self, nums: List[int], k: int) -> int:
        # Sorted, a best plan lifts a prefix by k and lowers the rest by k;
        # everyone moving together just keeps the raw span.
        nums.sort()
        n = len(nums)
        best = nums[-1] - nums[0]
        for i in range(1, n):
            # Cut after i elements: the extremes can only be the four
            # boundary values around the cut.
            high = max(nums[i - 1] + k, nums[-1] - k)
            low = min(nums[0] + k, nums[i] - k)
            best = min(best, high - low)
        return best
