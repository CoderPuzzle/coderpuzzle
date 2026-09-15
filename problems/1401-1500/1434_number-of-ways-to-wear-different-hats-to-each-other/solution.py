from typing import List, Optional


class Solution:
    def numberWays(self, hats: List[List[int]]) -> int:
        MOD = 10**9 + 7
        n = len(hats)
        full = (1 << n) - 1
        h2p = [[] for _ in range(41)]
        for p, prefs in enumerate(hats):
            for h in prefs:
                h2p[h].append(p)
        # dp[mask]: ways to hat exactly the people in mask using hats so far
        # (<=10 people -> 1024 states; hats fold into the loop dimension)
        dp = [0] * (full + 1)
        dp[0] = 1
        for h in range(1, 41):
            people = h2p[h]
            if not people:
                continue
            # copy encodes leaving this hat unused; updating into the copy
            # (reading old dp) also ensures no hat is worn by two people
            ndp = dp[:]
            for mask in range(full + 1):
                v = dp[mask]
                if not v:
                    continue
                for p in people:
                    bit = 1 << p
                    if not mask & bit:
                        ndp[mask | bit] = (ndp[mask | bit] + v) % MOD
            dp = ndp
        # full mask: every person hatted; unused hats cost nothing
        return dp[full]
