from typing import List, Optional


class Solution:
    def maximumUniqueSubarray(self, nums: List[int]) -> int:
        # Erasing one all-distinct subarray for the highest score is a
        # search for the maximum-sum window with no repeated value. Sweep
        # the right end forward, and while the incoming value is already
        # inside the window, retire elements from the left, dropping their
        # sum. Values lie in [1, 10^4], so a flat count array spots the
        # repeat in constant time, and because every value is positive the
        # longest distinct window ending at each right end is also the
        # richest one there. The total can reach 10^5 * 10^4 = 10^9,
        # barely inside 32 bits — arbitrary-width ints carry it natively.
        freq = [0] * 10001
        left = 0
        window_sum = 0
        best = 0
        for value in nums:
            while freq[value] > 0:
                freq[nums[left]] -= 1
                window_sum -= nums[left]
                left += 1
            freq[value] += 1
            window_sum += value
            best = max(best, window_sum)
        return best
