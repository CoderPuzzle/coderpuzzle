from typing import List


class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        # A subarray qualifies exactly when it holds >= k copies of M = max(nums).
        # Scan right ends, shrink the left end while the window keeps k copies;
        # afterwards `left` is the number of start positions that still keep
        # k copies for the current right end, so each qualifying subarray is
        # counted exactly once, at its right end. Answer peaks at
        # n*(n+1)/2 ~ 5*10^9, which needs 64 bits.
        m = max(nums)
        left = 0
        count = 0
        answer = 0
        for right, value in enumerate(nums):
            if value == m:
                count += 1
            while count == k:
                if nums[left] == m:
                    count -= 1
                left += 1
            answer += left
        return answer
