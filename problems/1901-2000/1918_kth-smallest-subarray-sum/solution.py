from typing import List, Optional


class Solution:
    def kthSmallestSubarraySum(self, nums: List[int], k: int) -> int:
        # f(x) = number of subarrays with sum <= x. Sliding window: positivity
        # guarantees shrinking monotonically reduces the sum.
        def count_at_most(limit):
            total = 0
            window_sum = 0
            left = 0
            for right, value in enumerate(nums):
                window_sum += value
                while window_sum > limit:
                    window_sum -= nums[left]
                    left += 1
                # Subarrays ending at `right` that fit: exactly the window's length.
                total += right - left + 1
            return total

        # Search [smallest element, whole-array sum]: f is non-decreasing and jumps
        # only at real subarray sums, so the smallest x with f(x) >= k IS the k-th
        # smallest sum — no need to enumerate the O(n^2) candidates.
        lo, hi = min(nums), sum(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if count_at_most(mid) >= k:
                hi = mid
            else:
                lo = mid + 1
        return lo
