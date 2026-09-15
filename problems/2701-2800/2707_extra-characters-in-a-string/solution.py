from typing import List


class Solution:
    def minExtraChar(self, s: str, dictionary: List[str]) -> int:
        # dp[i] holds the fewest extra characters left over after breaking
        # the prefix s[:i] optimally; dp[0] is the empty prefix.
        n = len(s)
        dp = [n + 1] * (n + 1)
        dp[0] = 0
        for i in range(n):
            # skip move: leave s[i] as an extra character
            if dp[i] + 1 < dp[i + 1]:
                dp[i + 1] = dp[i] + 1
            # match moves: a word starting at i jumps to i + len(word)
            for word in dictionary:
                j = i + len(word)
                if j <= n and s[i:j] == word and dp[i] < dp[j]:
                    dp[j] = dp[i]
        return dp[n]
