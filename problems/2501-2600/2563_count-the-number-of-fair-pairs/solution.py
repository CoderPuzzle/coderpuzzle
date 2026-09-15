from typing import List


class Solution:
    def countFairPairs(self, nums: List[int], lower: int, upper: int) -> int:
        # Sorting discards index identity, but fairness only depends on
        # values: counting ordered positions i < j in the sorted array
        # counts each original pair exactly once.
        arr = sorted(nums)

        def count_at_most(limit):
            # Sliding window: once arr[lo] + arr[hi] <= limit, every index
            # between lo and hi pairs with lo as well, worth hi - lo pairs.
            total = 0
            lo, hi = 0, len(arr) - 1
            while lo < hi:
                if arr[lo] + arr[hi] <= limit:
                    total += hi - lo
                    lo += 1
                else:
                    hi -= 1
            return total

        return count_at_most(upper) - count_at_most(lower - 1)
