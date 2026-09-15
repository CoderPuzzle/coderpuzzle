class Solution:
    def numberOfArrays(self, s: str, k: int) -> int:
        MOD = 10**9 + 7
        n = len(s)
        max_len = len(str(k))
        dp = [0] * (n + 1)
        dp[n] = 1
        for i in range(n - 1, -1, -1):
            if s[i] == "0":
                continue
            total = 0
            value = 0
            for L in range(1, min(max_len, n - i) + 1):
                value = value * 10 + (ord(s[i + L - 1]) - 48)
                if value > k:
                    break
                total += dp[i + L]
            dp[i] = total % MOD
        return dp[0]
