from typing import List


class Solution:
    def minLength(self, nums: List[int], k: int) -> int:
        # One pass, right end expanding: freq counts each value inside the
        # window and distinct_sum tracks the sum of the distinct values
        # present — a value joins the sum when its first copy enters and
        # leaves it when its last copy departs.
        freq = {}
        distinct_sum = 0
        best = -1
        left = 0
        for right, num in enumerate(nums):
            freq[num] = freq.get(num, 0) + 1
            if freq[num] == 1:
                distinct_sum += num
            # Shrink from the left while the window stays qualified; every
            # prefix of a kept window is dropped only after recording it.
            while distinct_sum >= k and left <= right:
                length = right - left + 1
                if best == -1 or length < best:
                    best = length
                out = nums[left]
                if freq[out] == 1:
                    distinct_sum -= out
                freq[out] -= 1
                left += 1
        return best
