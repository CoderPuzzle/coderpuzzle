from typing import List


class Solution:
    def maxSum(self, nums: List[int], m: int, k: int) -> int:
        # Slide a window of exactly k values while maintaining its value
        # frequencies and running sum: each step inserts the entering value
        # and evicts the leaving one, so len(freq) is always the current
        # window's distinct count. Each window is compared once, at the
        # moment it reaches full length k.
        best = 0
        freq = {}
        win_sum = 0
        for right, value in enumerate(nums):
            freq[value] = freq.get(value, 0) + 1
            win_sum += value
            if right >= k:
                old = nums[right - k]
                if freq[old] == 1:
                    del freq[old]
                else:
                    freq[old] -= 1
                win_sum -= old
            if right + 1 >= k and len(freq) >= m:
                best = max(best, win_sum)
        return best
