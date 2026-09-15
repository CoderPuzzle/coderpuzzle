from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        # Only increments exist and index 0 never moves, so a finished array
        # is a nondecreasing divisibility chain anchored at nums[0]. No
        # optimal chain runs above 2600: past max(nums) the chain could be
        # held flat for free (equal still divides), so only the last element
        # may sit higher, and its cheapest fix stays under predecessor + 50.
        cap = 2600
        # Divisor lists of every final value, self inclusive -- holding the
        # previous height must remain a legal move.
        divisors = [[] for _ in range(cap + 1)]
        for u in range(1, cap + 1):
            for m in range(u, cap + 1, u):
                divisors[m].append(u)
        inf = 1 << 30
        # dp[v]: cheapest way to make the processed prefix beautiful with the
        # last position holding exactly v.
        dp = [inf] * (cap + 1)
        dp[nums[0]] = 0
        for i in range(1, len(nums)):
            need = nums[i]
            ndp = [inf] * (cap + 1)
            for v in range(need, cap + 1):
                best = inf
                for u in divisors[v]:
                    if dp[u] < best:
                        best = dp[u]
                if best < inf:
                    ndp[v] = best + v - need
            dp = ndp
        return min(dp)
