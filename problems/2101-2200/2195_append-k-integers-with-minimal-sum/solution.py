from typing import List


class Solution:
    def minimalKSum(self, nums: List[int], k: int) -> int:
        # The appended set is the k smallest positive integers missing
        # from nums. Sort the distinct values, take whole gaps between
        # consecutive kept values with arithmetic-series sums, and finish
        # in the tail after the last value if k is still unmet.
        total = 0
        taken = 0
        previous = 0
        for value in sorted(set(nums)):
            if taken >= k:
                break
            gap = value - previous - 1
            if gap > 0:
                use = min(gap, k - taken)
                total += use * (previous + 1) + use * (use - 1) // 2
                taken += use
            previous = value
        if taken < k:
            use = k - taken
            total += use * (previous + 1) + use * (use - 1) // 2
        return total
