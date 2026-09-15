from typing import List


class Solution:
    def minXor(self, nums: List[int], k: int) -> int:
        # dp over prefixes: dp[j][i] = smallest achievable "maximum part
        # XOR" splitting the first i elements into j parts. The last part
        # of an optimal split is nums[t..i-1], whose XOR is pre[i] ^ pre[t],
        # so dp[j][i] = min over t of max(dp[j-1][t], pre[i] ^ pre[t]).
        # Rows roll: prev is dp[j-1], cur becomes dp[j].
        n = len(nums)
        pre = [0] * (n + 1)
        for i, value in enumerate(nums):
            pre[i + 1] = pre[i] ^ value

        BIG = 1 << 62
        prev = pre[:]  # dp[1][i] = XOR of the whole prefix — the only split
        for j in range(2, k + 1):
            cur = [BIG] * (n + 1)
            for i in range(j, n + 1):
                pi = pre[i]
                cur[i] = min(max(prev[t], pi ^ pre[t]) for t in range(j - 1, i))
            prev = cur
        return prev[n]
