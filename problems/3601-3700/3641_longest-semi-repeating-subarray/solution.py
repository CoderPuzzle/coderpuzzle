from typing import List


class Solution:
    def longestSubarray(self, nums: List[int], k: int) -> int:
        # freq counts occurrences of each value inside the window; dup counts
        # how many values have been seen twice or more.
        freq = {}
        dup = 0
        left = 0
        best = 0
        for right, value in enumerate(nums):
            freq[value] = freq.get(value, 0) + 1
            if freq[value] == 2:
                dup += 1
            # Grow past k repeating values and the window must give ground
            # until one of them is fully evicted again.
            while dup > k:
                leaving = nums[left]
                freq[leaving] -= 1
                if freq[leaving] == 1:
                    dup -= 1
                left += 1
            best = max(best, right - left + 1)
        return best
