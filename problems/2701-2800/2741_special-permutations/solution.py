from typing import List, Optional


class Solution:
    def specialPerm(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        n = len(nums)
        size = 1 << n
        # dp[mask][last]: ways to arrange exactly the indices in `mask`,
        # ending with `last`, every adjacent pair already compatible. n <= 14
        # keeps the 2^n * n table small.
        dp = [[0] * n for _ in range(size)]
        for i in range(n):
            dp[1 << i][i] = 1
        # Increasing mask order finalizes each state before it propagates.
        for mask in range(size):
            for last in range(n):
                if not (mask >> last) & 1:
                    continue
                ways = dp[mask][last]
                if ways == 0:
                    continue
                for nxt in range(n):
                    if (mask >> nxt) & 1:
                        continue
                    # Push forward: append any unused index whose value
                    # divides nums[last] or is divided by it (checked
                    # symmetrically). Every special permutation decomposes
                    # uniquely into such steps, so none is double-counted.
                    if nums[last] % nums[nxt] == 0 or nums[nxt] % nums[last] == 0:
                        target = dp[mask | (1 << nxt)]
                        target[nxt] = (target[nxt] + ways) % MOD
        return sum(dp[size - 1]) % MOD
