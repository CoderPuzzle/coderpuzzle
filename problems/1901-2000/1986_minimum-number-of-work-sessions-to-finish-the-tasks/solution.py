from typing import List, Optional


class Solution:
    def minSessions(self, tasks: List[int], sessionTime: int) -> int:
        n = len(tasks)
        FULL = (1 << n) - 1
        INF = float("inf")
        # dp[mask] = (sessions_used, remaining_time_in_open_session)
        dp = [(INF, 0)] * (1 << n)
        dp[0] = (0, 0)
        for mask in range(1 << n):
            sessions, remaining = dp[mask]
            if sessions == INF:
                continue
            for i in range(n):
                bit = 1 << i
                if mask & bit:
                    continue
                cost = tasks[i]
                if remaining >= cost:
                    cand = (sessions, remaining - cost)
                else:
                    cand = (sessions + 1, sessionTime - cost)
                # fewer sessions wins; tie -> more remaining time wins
                if cand[0] < dp[mask | bit][0] or (cand[0] == dp[mask | bit][0] and cand[1] > dp[mask | bit][1]):
                    dp[mask | bit] = cand
        return dp[FULL][0]
