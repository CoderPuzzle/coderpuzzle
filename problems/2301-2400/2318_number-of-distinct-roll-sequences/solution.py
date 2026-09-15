from typing import List, Optional
from math import gcd


class Solution:
    def distinctSequences(self, n: int) -> int:
        MOD = 10**9 + 7
        if n == 1:
            return 6
        # dp[a][b] counts valid sequences ending in ..., a, b; the gap rule
        # looks back exactly two positions, so nothing older matters
        dp = [[0] * 7 for _ in range(7)]
        # base: length-2 sequences, one per ordered coprime pair with a != b
        for a in range(1, 7):
            for b in range(1, 7):
                if a != b and gcd(a, b) == 1:
                    dp[a][b] = 1
        for _ in range(3, n + 1):
            ndp = [[0] * 7 for _ in range(7)]
            for a in range(1, 7):
                for b in range(1, 7):
                    cnt = dp[a][b]
                    # coprime pairs are sparse: skipping dead states prunes
                    # most of the 36-entry table
                    if cnt:
                        for c in range(1, 7):
                            # c != b: no adjacent equal (coprimality alone
                            # misses (1,1)); c != a: no repeat at distance 2
                            # (gcd would not object when a = 1)
                            if c != a and c != b and gcd(c, b) == 1:
                                # ..., a, b, c ends in (b, c)
                                ndp[b][c] = (ndp[b][c] + cnt) % MOD
            dp = ndp
        return sum(sum(row) for row in dp) % MOD
