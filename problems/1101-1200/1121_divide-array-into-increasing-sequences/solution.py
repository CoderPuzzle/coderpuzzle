from typing import List


class Solution:
    def canDivideIntoSubsequences(self, nums: List[int], k: int) -> bool:
        # The longest run of equal values forces that many separate
        # sequences; the array is sorted, so runs are contiguous.
        maxfreq = 1
        run = 1
        for i in range(1, len(nums)):
            run = run + 1 if nums[i] == nums[i - 1] else 1
            if run > maxfreq:
                maxfreq = run
        # n elements over maxfreq sequences: the shortest can reach only
        # floor(n / maxfreq), so the division works iff n >= maxfreq * k.
        # The product can hit 1e10, which Python handles natively.
        return len(nums) >= maxfreq * k
