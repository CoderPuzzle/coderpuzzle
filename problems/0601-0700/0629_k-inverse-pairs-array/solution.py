MOD = 10**9 + 7


class Solution:
    def kInversePairs(self, n: int, k: int) -> int:
        # dp[j] counts the arrangements of the numbers placed so far that
        # have exactly j inverse pairs; inserting the new maximum m into
        # any of its m slots adds between 0 and m-1 pairs, so row m at j
        # is the sliding-window sum of row m-1 over [j-m+1, j]. The
        # window is reduced at every step; Python ints never overflow, so
        # the raw pre-mod sum is exact anyway.
        dp = [0] * (k + 1)
        dp[0] = 1
        for m in range(2, n + 1):
            nxt = [0] * (k + 1)
            window = 0
            for j in range(k + 1):
                window += dp[j]
                if j >= m:
                    window -= dp[j - m]
                window %= MOD
                nxt[j] = window
            dp = nxt
        return dp[k]
