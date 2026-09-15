from typing import List, Optional


class Solution:
    def numWays(self, words: List[str], target: str) -> int:
        MOD = 10**9 + 7
        width = len(words[0])
        n = len(target)
        # Fewer columns than target characters: no strictly increasing
        # sequence of that length exists.
        if n > width:
            return 0

        # charCount[k][c]: how many rows have letter c at column k.
        charCount = [[0] * 26 for _ in range(width)]
        for word in words:
            for k, ch in enumerate(word):
                charCount[k][ord(ch) - 97] += 1

        # dp[i]: ways to have placed the first i target characters using the
        # columns considered so far. Rolled forward one column at a time.
        dp = [0] * (n + 1)
        dp[0] = 1
        for k in range(width):
            counts = charCount[k]
            # Walk i downward so dp[i - 1] still reflects the previous
            # column's value when it feeds dp[i] this round -- the usual
            # rolling-knapsack update order.
            for i in range(n, 0, -1):
                need = ord(target[i - 1]) - 97
                dp[i] = (dp[i] + dp[i - 1] * counts[need]) % MOD
        return dp[n]
