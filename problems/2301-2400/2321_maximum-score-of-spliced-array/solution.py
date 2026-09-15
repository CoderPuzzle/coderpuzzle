from typing import List


class Solution:
    def maximumsSplicedArray(self, nums1: List[int], nums2: List[int]) -> int:
        # A swap moves a contiguous block of difference between the arrays:
        # sum(nums1) changes by the range sum of nums2[i] - nums1[i], and
        # sum(nums2) by the negated amount. Each side's best outcome is its
        # base sum plus a maximum subarray of that difference array.
        def spliced_best(base: List[int], other: List[int]) -> int:
            # Kadane clamped at 0 covers "not do anything" for free.
            base_sum = 0
            best_gain = 0
            current = 0
            for base_value, other_value in zip(base, other):
                base_sum += base_value
                difference = other_value - base_value
                current = max(difference, current + difference)
                best_gain = max(best_gain, current)
            return base_sum + best_gain

        return max(spliced_best(nums1, nums2), spliced_best(nums2, nums1))
