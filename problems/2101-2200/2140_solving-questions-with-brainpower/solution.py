from typing import List, Optional


class Solution:
    def mostPoints(self, questions: List[List[int]]) -> int:
        n = len(questions)
        # dp[i] = best score starting at question i; dp[n] = 0 is the
        # sentinel for "nothing left". Fill right to left so every future
        # value is ready before it is read.
        dp = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            points, brainpower = questions[i]
            # nxt is the first question unlocked after the lockout; a jump
            # past the end reads the zero sentinel.
            nxt = i + brainpower + 1
            take = points + (dp[nxt] if nxt <= n else 0)
            # Skip keeps dp[i+1]; take solves and jumps.
            dp[i] = max(dp[i + 1], take)
        return dp[0]
