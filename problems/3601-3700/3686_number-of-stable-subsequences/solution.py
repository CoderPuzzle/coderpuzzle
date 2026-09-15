from typing import List


class Solution:
    def countStableSubsequences(self, nums: List[int]) -> int:
        MOD = 1_000_000_007
        # Three same-parity elements in a row are the only way a subsequence
        # breaks, so four counters describe every stable subsequence seen so
        # far: trailing even run of length 1 or 2, trailing odd run of 1 or 2.
        e1 = e2 = o1 = o2 = 0
        for x in nums:
            if x % 2 == 0:
                # Take x as a fresh subsequence, after any odd-ending one
                # (the even run restarts at 1), or after an even run of 1;
                # a third consecutive even would be unstable. Both updates
                # read the old counters before either lands.
                e1, e2 = (e1 + o1 + o2 + 1) % MOD, (e2 + e1) % MOD
            else:
                # Mirror image with odd and even swapped.
                o1, o2 = (o1 + e1 + e2 + 1) % MOD, (o2 + o1) % MOD
        return (e1 + e2 + o1 + o2) % MOD
