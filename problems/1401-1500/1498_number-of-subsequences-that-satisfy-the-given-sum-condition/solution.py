from typing import List, Optional


class Solution:
    def numSubseq(self, nums: List[int], target: int) -> int:
        MOD = 10**9 + 7
        # A subsequence is defined by membership, not order, so sorting loses
        # nothing; validity then depends only on smallest + largest <= target.
        nums = sorted(nums)
        n = len(nums)
        # Powers of two: elements strictly between the two pointers may be
        # included or excluded freely.
        powers = [1] * n
        for i in range(1, n):
            powers[i] = powers[i - 1] * 2 % MOD
        total = 0
        lo, hi = 0, n - 1
        while lo <= hi:
            if nums[lo] + nums[hi] <= target:
                # hi is the farthest legal partner of lo (earlier decrements
                # rule out anything beyond), so 2^(hi-lo) subsequences have
                # their minimum exactly at lo.
                total = (total + powers[hi - lo]) % MOD
                lo += 1
            else:
                # nums[hi] is too large to pair with anything at or after lo.
                hi -= 1
        return total
