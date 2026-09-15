class Solution:
    def minSkips(self, dist: List[int], speed: int, hoursBefore: int) -> int:
        # dp[j] = smallest accumulated time (in distance units) after the
        # current road with j skips used; rests already rounded. Rest:
        # ceil((t+d)/speed)*speed at same j; skip: t+d at j+1.
        INF = float("inf")
        n = len(dist)
        dp = [INF] * (n + 1)
        dp[0] = 0
        for i, d in enumerate(dist):
            ndp = [INF] * (n + 1)
            if i == n - 1:
                for j in range(n + 1):
                    if dp[j] != INF and dp[j] + d < ndp[j]:
                        ndp[j] = dp[j] + d
            else:
                for j in range(n):
                    t = dp[j]
                    if t == INF:
                        continue
                    arr = t + d
                    if arr < ndp[j + 1]:
                        ndp[j + 1] = arr
                    rested = (arr + speed - 1) // speed * speed
                    if rested < ndp[j]:
                        ndp[j] = rested
            dp = ndp
        for j in range(n + 1):
            if dp[j] != INF and dp[j] <= hoursBefore * speed:
                return j
        return -1
