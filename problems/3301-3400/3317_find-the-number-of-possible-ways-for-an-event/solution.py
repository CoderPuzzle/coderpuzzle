class Solution:
    def numberOfWays(self, n: int, x: int, y: int) -> int:
        # dp[j] counts the assignments of the first i performers onto
        # exactly j nonempty of the x stages. The next performer either
        # joins one of the j formed bands or opens one on one of the
        # x - j + 1 unused stages; walking j downward updates the row in
        # place. Each j-band arrangement later takes a score per band, so
        # the answer sums dp[j] * y^j. All arithmetic is modulo 1e9 + 7,
        # applied bottom-up over performers and bands — no recursion.
        MOD = 10**9 + 7
        dp = [0] * (x + 1)
        dp[0] = 1
        for i in range(1, n + 1):
            for j in range(min(i, x), 0, -1):
                dp[j] = (dp[j] * j + dp[j - 1] * (x - j + 1)) % MOD
            dp[0] = 0
        ans = 0
        power = 1
        for j in range(1, x + 1):
            power = power * y % MOD
            ans = (ans + dp[j] * power) % MOD
        return ans
