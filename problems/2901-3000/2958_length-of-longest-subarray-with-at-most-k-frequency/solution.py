from typing import List


class Solution:
    def maxSubarrayLength(self, nums: List[int], k: int) -> int:
        # Expand the window rightward; only the entering value can break
        # goodness (its own count crosses k), so shrink from the left until
        # one copy of it falls out. Every index enters and leaves the
        # window once, making the whole scan linear.
        counts = {}
        best = 0
        left = 0
        for r, v in enumerate(nums):
            counts[v] = counts.get(v, 0) + 1
            while counts[v] > k:
                w = nums[left]
                counts[w] -= 1
                if counts[w] == 0:
                    del counts[w]
                left += 1
            best = max(best, r - left + 1)
        return best
