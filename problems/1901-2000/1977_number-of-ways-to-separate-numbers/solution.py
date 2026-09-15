from typing import List, Optional
from array import array


class Solution:
    def numberOfCombinations(self, num: str) -> int:
        MOD = 10**9 + 7
        n = len(num)
        if n == 0 or num[0] == "0":
            return 0

        # lcp[i][j] = length of the longest common prefix of num[i:] and num[j:]
        lcp = [array("H", [0]) * (n + 1) for _ in range(n + 1)]
        for i in range(n - 1, -1, -1):
            row = lcp[i]
            nxt = lcp[i + 1]
            ci = num[i]
            for j in range(n - 1, -1, -1):
                if ci == num[j]:
                    row[j] = nxt[j + 1] + 1

        # dp[i][j] = ways to separate num[:i] with last number num[i-j:i];
        # pre[i][j] = sum_{k=1..j} dp[i][k] (mod MOD)
        dp = [array("i", [0]) * (n + 1) for _ in range(n + 1)]
        pre = [array("i", [0]) * (n + 1) for _ in range(n + 1)]

        for i in range(1, n + 1):
            dp_i = dp[i]
            pre_i = pre[i]
            for j in range(1, i + 1):
                if j == i:
                    val = 1  # whole prefix num[:i] is a single number
                elif num[i - j] == "0":
                    val = 0  # leading zero not allowed
                else:
                    # previous number shorter than the current one
                    val = pre[i - j][min(j - 1, i - j)]
                    # previous number of the same length
                    if i - j >= j:
                        a = i - 2 * j
                        b = i - j
                        l = lcp[a][b]
                        if l >= j or num[a + l] <= num[b + l]:
                            val += dp[i - j][j]
                            if val >= MOD:
                                val -= MOD
                dp_i[j] = val
                pre_i[j] = pre_i[j - 1] + val
                if pre_i[j] >= MOD:
                    pre_i[j] -= MOD

        return pre[n][n] % MOD
