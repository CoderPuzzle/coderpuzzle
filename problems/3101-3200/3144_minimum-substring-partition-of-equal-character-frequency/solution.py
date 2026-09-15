from typing import List


class Solution:
    def minimumSubstringsInPartition(self, s: str) -> int:
        # dp[i] = fewest balanced pieces covering the first i characters.
        # Extending a candidate start j leftwards one letter at a time
        # keeps its counts in an array while tracking how many letters are
        # live and the largest count seen; the window is balanced exactly
        # when live * largest equals its length, which makes each dp[i] one
        # backwards sweep away.
        n = len(s)
        dp = [0] + [10**9] * n
        for i in range(1, n + 1):
            counts = [0] * 26
            live = 0
            top = 0
            # extend the substring ending at i towards the left; dp[j] is
            # the best split for everything before position j in this loop
            for right in range(i - 1, -1, -1):
                b = ord(s[right]) - 97
                if counts[b] == 0:
                    live += 1
                counts[b] += 1
                if counts[b] > top:
                    top = counts[b]
                if live * top == i - right and dp[right] + 1 < dp[i]:
                    dp[i] = dp[right] + 1
        return dp[n]
