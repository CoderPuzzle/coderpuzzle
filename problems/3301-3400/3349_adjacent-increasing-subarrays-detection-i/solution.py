from typing import List


class Solution:
    def hasIncreasingSubarrays(self, nums: List[int], k: int) -> bool:
        # run[i] = length of the strictly increasing run ending at i. The
        # window ending at i is strictly increasing exactly when run[i] is
        # at least k, so two adjacent windows end k apart and both qualify
        # when run[i] and run[i - k] both reach k.
        n = len(nums)
        run = [1] * n
        for i in range(1, n):
            if nums[i] > nums[i - 1]:
                run[i] = run[i - 1] + 1
        return any(run[i] >= k and run[i - k] >= k for i in range(2 * k - 1, n))
