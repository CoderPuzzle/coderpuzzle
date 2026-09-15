class Solution:
    def distinctSubseqII(self, s: str) -> int:
        MOD = 10**9 + 7
        n = len(s)
        dp = [0] * (n + 1)
        # dp[i]: distinct subsequences of the first i chars, empty included.
        dp[0] = 1
        last = [-1] * 26
        for i in range(1, n + 1):
            c = ord(s[i - 1]) - ord("a")
            # Appending c nominally doubles the count...
            dp[i] = dp[i - 1] * 2 % MOD
            if last[c] >= 0:
                # ...but on a repeat, subtract the strings already produced
                # when c was last appended: dp of the prefix before it.
                dp[i] = (dp[i] - dp[last[c]]) % MOD
            last[c] = i - 1
        # Drop the empty subsequence; Python's % repairs the wrap.
        return (dp[n] - 1) % MOD
