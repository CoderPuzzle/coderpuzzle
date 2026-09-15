from typing import List, Optional


class Solution:
    def possibleStringCount(self, word: str, k: int) -> int:
        MOD = 10**9 + 7
        # Each maximal run of length c contributes between 1 and c intended
        # characters; count tuples of total length >= k as total - (length < k).
        runs = []
        i = 0
        n = len(word)
        while i < n:
            j = i
            while j < n and word[j] == word[i]:
                j += 1
            runs.append(j - i)
            i = j

        r = len(runs)
        total = 1
        for c in runs:
            total = total * c % MOD
        if k <= r:
            return total  # every tuple already has length >= r >= k

        # dp[j] = number of ways to reach total length j (< k).
        dp = [0] * k
        dp[0] = 1
        prefix = [0] * (k + 1)
        for c in runs:
            s = 0
            for j in range(k):
                s = (s + dp[j]) % MOD
                prefix[j + 1] = s
            ndp = [0] * k
            for j in range(1, k):
                lo = max(0, j - c)
                ndp[j] = (prefix[j] - prefix[lo]) % MOD
            dp = ndp

        bad = sum(dp) % MOD
        return (total - bad) % MOD
