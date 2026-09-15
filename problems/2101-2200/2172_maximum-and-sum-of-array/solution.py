from typing import List, Optional


class Solution:
    def maximumANDSum(self, nums: List[int], numSlots: int) -> int:
        # Model each slot as two individual positions: position p belongs to
        # slot p//2 + 1. numSlots <= 9 gives at most 18 positions, so 2^18
        # states exhaustively cover every assignment.
        positions = 2 * numSlots
        dp = [-1] * (1 << positions)
        dp[0] = 0
        best = 0
        for mask in range(1 << positions):
            # -1 marks unreachable masks.
            if dp[mask] < 0:
                continue
            # popcount says how many numbers are placed, so the next number
            # is determined by the state — a fixed placement order is exact
            # because the sum is symmetric in the assignment.
            i = bin(mask).count("1")
            if i == len(nums):
                best = max(best, dp[mask])
                continue
            for p in range(positions):
                if not mask & (1 << p):
                    nxt = dp[mask] + (nums[i] & (p // 2 + 1))
                    slot_mask = mask | (1 << p)
                    if nxt > dp[slot_mask]:
                        dp[slot_mask] = nxt
        return best
