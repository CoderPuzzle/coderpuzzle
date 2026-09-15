from typing import List


class Solution:
    def uniformArray(self, nums1: List[int]) -> bool:
        # All-even needs 0 odd elements, or at least 2 so each odd can
        # subtract another odd; all-odd needs at least one odd for the even
        # elements to subtract. One of the two always holds, so the answer
        # is always true.
        odd = sum(1 for x in nums1 if x % 2 == 1)
        all_even_ok = odd == 0 or odd >= 2
        all_odd_ok = odd >= 1
        return all_even_ok or all_odd_ok
