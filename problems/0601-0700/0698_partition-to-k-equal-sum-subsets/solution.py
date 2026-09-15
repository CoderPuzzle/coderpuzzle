from typing import List


class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        total = sum(nums)
        if total % k:
            return False
        target = total // k
        # Largest elements are hardest to place; descending order prunes early.
        nums.sort(reverse=True)
        if nums[0] > target:
            return False
        n = len(nums)
        full = (1 << n) - 1
        memo = {}

        # State: bitmask of placed elements plus curr, the partial sum of the
        # subset currently being filled.
        def dfs(mask, curr):
            if mask == full:
                return True
            # Subset complete: start the next one from zero.
            if curr == target:
                return dfs(mask, 0)
            key = (mask, curr)
            if key in memo:
                return memo[key]
            for i in range(n):
                # Try every unused element that still fits under the target.
                if not (mask >> i) & 1 and curr + nums[i] <= target:
                    if dfs(mask | (1 << i), curr + nums[i]):
                        memo[key] = True
                        return True
            memo[key] = False
            return False

        return dfs(0, 0)
