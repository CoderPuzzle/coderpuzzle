from typing import List, Optional


class Solution:
    def countTheNumOfKFreeSubsets(self, nums: List[int], k: int) -> int:
        nums = sorted(nums)
        group_of = {}
        lengths = []
        # Two elements conflict only when they differ by exactly k, which
        # chains values into arithmetic sequences: x joins x - k's group when
        # that predecessor exists, else starts a new one. Any conflicting pair
        # lands in the same chain, so different groups are independent.
        for x in nums:
            if x - k in group_of:
                gid = group_of[x - k]
                group_of[x] = gid
                lengths[gid] += 1
            else:
                group_of[x] = len(lengths)
                lengths.append(1)
        ans = 1
        for length in lengths:
            # A k-free subset of a chain omits chain-adjacent members —
            # independent sets of a path. dp[i] = dp[i-1] + dp[i-2] (skip i,
            # or take it and forgo its predecessor) is a Fibonacci shift;
            # after `length` steps b is the chain's valid subset count.
            a, b = 1, 1
            for _ in range(length):
                a, b = b, a + b
            ans *= b
        return ans
