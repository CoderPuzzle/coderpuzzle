from typing import List, Optional


class Solution:
    def maximumStrength(self, nums: List[int], k: int) -> int:
        NEG = float("-inf")
        n = len(nums)
        # nxt[j][x] = dp[i+1][j][x]: x=1 means nums[i] is inside the j-th
        # (from the right) subarray, x=0 means it is not
        nxt = [[NEG, NEG] for _ in range(k + 1)]
        nxt[0][0] = 0
        for i in range(n - 1, -1, -1):
            cur = [[NEG, NEG] for _ in range(k + 1)]
            for j in range(k + 1):
                if j >= 1:
                    coeff = j if (j & 1) else -j
                    best = nxt[j - 1][0]
                    if nxt[j][1] > best:
                        best = nxt[j][1]
                    cur[j][1] = nums[i] * coeff + best
                cur[j][0] = nxt[j][0]
                if cur[j][1] > cur[j][0]:
                    cur[j][0] = cur[j][1]
            nxt = cur
        return nxt[k][0]
