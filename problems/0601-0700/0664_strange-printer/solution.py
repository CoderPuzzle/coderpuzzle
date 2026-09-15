class Solution:
    def strangePrinter(self, s: str) -> int:
        # dp[i][j] is the fewest turns that print s[i..j]. The stroke that
        # leaves s[i] standing either covers i alone, dp[i+1][j] + 1, or
        # runs on to some k with s[k] == s[i]: that stroke is shared with
        # the suffix s[k..j] while the overprinted gap s[i+1..k-1] is
        # solved on its own, dp[i+1][k-1] + dp[k][j].
        n = len(s)
        dp = [[0] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            dp[i][i] = 1
            for j in range(i + 1, n):
                best = dp[i + 1][j] + 1
                for k in range(i + 1, j + 1):
                    if s[k] == s[i]:
                        candidate = dp[i + 1][k - 1] + dp[k][j]
                        if candidate < best:
                            best = candidate
                dp[i][j] = best
        return dp[0][n - 1]
