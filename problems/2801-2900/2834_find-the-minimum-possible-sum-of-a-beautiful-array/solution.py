class Solution:
    def minimumPossibleSum(self, n: int, target: int) -> int:
        MOD = 1_000_000_007

        # Cheaply available prefix 1..k: its two largest distinct values sum
        # to k + (k - 1) <= target - 1 < target, so it never self-conflicts.
        # Every value in (k, target) pairs with an already-taken small number,
        # so the greedy jumps straight past target for the remaining m slots;
        # values >= target only pair with non-positive complements or larger
        # values, so the tail target..target+m-1 is also conflict-free.
        k = min(n, target // 2)
        m = n - k
        # Exact big-int arithmetic; worst case ~7.5e17 before the single mod.
        total = k * (k + 1) // 2 + m * target + m * (m - 1) // 2
        return total % MOD
