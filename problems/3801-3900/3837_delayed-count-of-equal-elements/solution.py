from typing import List


class Solution:
    def delayedCount(self, nums: List[int], k: int) -> List[int]:
        # Sweep i from the right; freq counts occurrences of each value in
        # the window [i + k + 1, n - 1], so stepping i down inserts exactly
        # nums[i + k + 1] and the delayed count is a single lookup.
        n = len(nums)
        ans = [0] * n
        freq = {}
        for i in range(n - 1, -1, -1):
            ahead = i + k + 1
            if ahead < n:
                freq[nums[ahead]] = freq.get(nums[ahead], 0) + 1
            ans[i] = freq.get(nums[i], 0)
        return ans
