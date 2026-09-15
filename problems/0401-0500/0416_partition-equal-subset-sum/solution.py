from typing import List, Optional


class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)
        if total % 2:
            # An odd total cannot split into two equal halves.
            return False
        target = total // 2
        # Bit s of mask is set exactly when some processed subset sums to s;
        # sums above target are useless and truncated by `keep`.
        keep = (1 << (target + 1)) - 1
        mask = 1
        for value in nums:
            # Shift-or: every reachable s makes s + value reachable. The
            # shifted copy comes only from pre-update bits, so value is used
            # at most once — the 0/1 knapsack update, word-parallel.
            mask = (mask | (mask << value)) & keep
            if (mask >> target) & 1:
                # Complement of that subset also sums to target.
                return True
        return (mask >> target) & 1 == 1
