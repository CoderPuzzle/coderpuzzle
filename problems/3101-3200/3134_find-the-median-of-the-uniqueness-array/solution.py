from typing import List


class Solution:
    def medianOfUniquenessArray(self, nums: List[int]) -> int:
        n = len(nums)
        length = n * (n + 1) // 2
        # Lower median of the virtual uniqueness array = rank (length + 1) // 2.
        target_rank = (length + 1) // 2

        # Count subarrays with at most x distinct values via a sliding window.
        def count_at_most(x):
            freq = {}
            left = 0
            result = 0
            for right, value in enumerate(nums):
                freq[value] = freq.get(value, 0) + 1
                while len(freq) > x:
                    out = nums[left]
                    freq[out] -= 1
                    if freq[out] == 0:
                        del freq[out]
                    left += 1
                # Every start inside the now-valid window yields a qualifying subarray.
                result += right - left + 1
            return result

        # count_at_most is monotone in x, so the least x reaching the rank is the median.
        lo, hi = 1, n
        while lo < hi:
            mid = (lo + hi) // 2
            if count_at_most(mid) >= target_rank:
                hi = mid
            else:
                lo = mid + 1
        return lo
