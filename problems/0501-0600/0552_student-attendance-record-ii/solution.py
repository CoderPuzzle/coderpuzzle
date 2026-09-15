from typing import List, Optional


class Solution:
    def checkRecord(self, n: int) -> int:
        MOD = 10**9 + 7
        # dp[a][l] = number of records so far with `a` absences (<2)
        # and `l` trailing consecutive lates (<3)
        dp = [[0] * 3 for _ in range(2)]
        dp[0][0] = 1
        for _ in range(n):
            ndp = [[0] * 3 for _ in range(2)]
            for a in range(2):
                for l in range(3):
                    v = dp[a][l]
                    if not v:
                        continue
                    ndp[a][0] = (ndp[a][0] + v) % MOD  # append 'P'
                    if a + 1 < 2:
                        ndp[a + 1][0] = (ndp[a + 1][0] + v) % MOD  # append 'A'
                    if l + 1 < 3:
                        ndp[a][l + 1] = (ndp[a][l + 1] + v) % MOD  # append 'L'
            dp = ndp
        return sum(sum(row) for row in dp) % MOD
