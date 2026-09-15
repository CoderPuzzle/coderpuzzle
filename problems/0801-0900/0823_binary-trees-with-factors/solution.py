from typing import List, Optional


class Solution:
    def numFactoredBinaryTrees(self, arr: List[int]) -> int:
        MOD = 10**9 + 7
        arr = sorted(arr)
        index = {v: i for i, v in enumerate(arr)}
        dp = [1] * len(arr)  # dp[i] = trees rooted at arr[i]
        for i in range(len(arr)):
            v = arr[i]
            total = 1
            for j in range(i):
                if v % arr[j] == 0:
                    other = v // arr[j]
                    if other in index:
                        total += dp[j] * dp[index[other]]
            dp[i] = total % MOD
        return sum(dp) % MOD
