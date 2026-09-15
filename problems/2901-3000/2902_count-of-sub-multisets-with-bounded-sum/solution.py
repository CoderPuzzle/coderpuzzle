from itertools import accumulate
from typing import List, Optional


class Solution:
    def countSubMultisets(self, nums: List[int], l: int, r: int) -> int:
        # Group equal values: a sub-multiset takes each distinct value v
        # somewhere in 0..cnt[v] copies, so one pass per distinct value
        # applies the bounded-knapsack factor
        # new[x] = sum(dp[x - k*v] for k in 0..cnt[v]). Walk each residue
        # class mod v separately and slide a window of cnt[v] + 1 entries
        # over its prefix sums. Zeros change no sum and multiply every
        # count by cnt[0] + 1; the answer is dp[l] + ... + dp[r].
        MOD = 10**9 + 7
        counts = {}
        for v in nums:
            counts[v] = counts.get(v, 0) + 1
        dp = [1] + [0] * r
        for v, c in counts.items():
            if v == 0:
                dp = [x * (c + 1) % MOD for x in dp]
            elif v <= r:
                ndp = [0] * (r + 1)
                for r0 in range(min(v, r + 1)):
                    pre = list(accumulate(dp[r0::v], initial=0))
                    ndp[r0::v] = [(pre[j + 1] - pre[max(0, j + 1 - (c + 1))]) % MOD for j in range(len(pre) - 1)]
                dp = ndp
        return sum(dp[l : r + 1]) % MOD
