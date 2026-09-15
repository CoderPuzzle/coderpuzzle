from typing import List


class Solution:
    def maxVacationDays(self, flights: List[List[int]], days: List[List[int]]) -> int:
        n = len(flights)
        k = len(days[0])
        # dp[city] = best vacation total through the weeks handled so far;
        # -1 marks the cities no schedule has reached yet.
        dp: List[int] = [-1] * n
        # Before week 0 the traveler sits in city 0 with nothing banked, so
        # week 0's own step encodes the first Monday's flight.
        dp[0] = 0
        for w in range(k):
            ndp: List[int] = [-1] * n
            for j in range(n):
                for i in range(n):
                    if dp[i] < 0:
                        continue
                    # One decision per week: a Monday flight i -> j, or
                    # staying put (i == j) at no flight cost.
                    if i == j or flights[i][j] == 1:
                        total = dp[i] + days[j][w]
                        if total > ndp[j]:
                            ndp[j] = total
            dp = ndp
        # Staying in a city is always allowed, so the start city keeps some
        # schedule alive every week.
        return max(dp)
