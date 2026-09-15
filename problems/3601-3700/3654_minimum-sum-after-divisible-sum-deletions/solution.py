from typing import List


class Solution:
    def minArraySum(self, nums: List[int], k: int) -> int:
        # A block sums to a multiple of k exactly when its endpoint prefix
        # sums share a remainder mod k, and any deletion sequence collapses
        # to disjoint divisible-sum blocks of the original array.
        best = {0: 0}  # remainder -> smallest dp[j] among prefixes so far
        dp = 0  # min surviving sum over the elements processed so far
        prefix = 0
        for value in nums:
            # Keep this element...
            cand = dp + value
            prefix += value
            # ...or delete back to the nearest same-remainder prefix, which
            # leaves that prefix's surviving sum untouched.
            seen = best.get(prefix % k)
            if seen is not None and seen < cand:
                cand = seen
            dp = cand
            # Insert after the lookup so the empty block never registers.
            r = prefix % k
            cur = best.get(r)
            if cur is None or dp < cur:
                best[r] = dp
        return dp
