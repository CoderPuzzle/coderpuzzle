from typing import List


class Solution:
    def findCoins(self, numWays: List[int]) -> List[int]:
        # numWays[i] only depends on coins <= i, so scanning amounts in
        # ascending order the coin set is forced: maintain dp = unbounded
        # knapsack way-counts over the coins confirmed so far (dp[0] = 1).
        n = len(numWays)
        dp = [1] + [0] * n
        coins = []
        for i in range(1, n + 1):
            target = numWays[i - 1]
            # If the counts already match, coin i cannot exist: adding it
            # would lift the count to dp[i] + 1.
            if dp[i] == target:
                continue
            # One short means coin i must exist: it contributes dp[0] = 1
            # extra way to amount i. Fold it into the running DP.
            if dp[i] + 1 != target:
                return []
            coins.append(i)
            for s in range(i, n + 1):
                dp[s] += dp[s - i]
        return coins
