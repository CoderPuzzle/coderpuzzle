class Solution:
    def numberOfWays(self, n: int, x: int) -> int:
        # A set of unique bases is exactly a choice of which distinct xth
        # powers to take, each at most once -- a counting knapsack.
        mod = 10**9 + 7
        dp = [0] * (n + 1)
        dp[0] = 1
        base = 1
        while base**x <= n:
            power = base**x
            # Walking the sums downward reads dp[sum - power] at its
            # pre-power value, so no subset takes this power twice.
            for total in range(n, power - 1, -1):
                dp[total] = (dp[total] + dp[total - power]) % mod
            base += 1
        return dp[n]
