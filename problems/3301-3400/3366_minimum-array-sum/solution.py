from typing import List


class Solution:
    def minArraySum(self, nums: List[int], k: int, op1: int, op2: int) -> int:
        # dp[a][b] = smallest achievable sum of the remaining suffix given
        # a op1 uses and b op2 uses left. Each index branches over: skip,
        # op1 alone, op2 alone, and both operations on the same index — in
        # either order, because halve-then-subtract and subtract-then-halve
        # land on different values (e.g. 5 with k = 3: 5 -> 3 -> 0 beats
        # 5 -> 2 -> 1). All values stay non-negative, so sums fit 32 bits.
        nxt = [[0] * (op2 + 1) for _ in range(op1 + 1)]
        for value in reversed(nums):
            halved = (value + 1) // 2
            cur = [[0] * (op2 + 1) for _ in range(op1 + 1)]
            for a in range(op1 + 1):
                for b in range(op2 + 1):
                    best = value + nxt[a][b]
                    if a:
                        best = min(best, halved + nxt[a - 1][b])
                        if b:
                            both = nxt[a - 1][b - 1]
                            # op2's precondition applies to the value it
                            # meets, which depends on the order chosen.
                            if halved >= k:
                                best = min(best, halved - k + both)
                            if value >= k:
                                best = min(best, (value - k + 1) // 2 + both)
                    if b and value >= k:
                        best = min(best, value - k + nxt[a][b - 1])
                    cur[a][b] = best
            nxt = cur
        return nxt[op1][op2]
