from typing import List


class Solution:
    def minChanges(self, nums: List[int], k: int) -> int:
        # dp[x] holds the fewest changes among the residue classes handled
        # so far when the chosen class values XOR to x. Values are below
        # 2^10, so 1024 states cover every reachable XOR.
        dp = [1 << 20] * 1024
        dp[0] = 0
        for r in range(k):
            group = nums[r::k]
            size = len(group)
            count = [0] * 1024
            for v in group:
                count[v] += 1
            # Rewriting a whole class costs its full size and leaves its
            # value free, so every state is reachable at min(dp) + size;
            # keeping a value that already occurs can only improve on that.
            nxt = [min(dp) + size] * 1024
            for v in range(1024):
                c = count[v]
                if c:
                    cost = size - c
                    for u in range(1024):
                        t = dp[u] + cost
                        if t < nxt[u ^ v]:
                            nxt[u ^ v] = t
            dp = nxt
        return dp[0]
