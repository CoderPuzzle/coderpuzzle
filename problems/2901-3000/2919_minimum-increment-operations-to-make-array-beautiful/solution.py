from typing import List


class Solution:
    def minIncrementOperations(self, nums: List[int], k: int) -> int:
        # Raising a position above k never helps, so each position i has a
        # fixed cost max(0, k - nums[i]) for being raised; nums is
        # beautiful exactly when every window of 3 consecutive positions
        # contains a raised one. dp[i] = cheapest plan covering every
        # window in the prefix ending at i with position i raised, and the
        # previous raised position must be within distance 3.
        a = max(0, k - nums[0])
        b = max(0, k - nums[1])
        c = max(0, k - nums[2])
        for i in range(3, len(nums)):
            # Only the last three states are ever read: roll the window.
            a, b, c = b, c, max(0, k - nums[i]) + min(a, b, c)
        # The last raised position can be any of the final three.
        return min(a, b, c)
