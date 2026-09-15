from typing import List


class Solution:
    def countPairs(self, nums: List[int], target: int) -> int:
        # Unordered index pairs are unaffected by order, so sorting a copy is
        # safe. With two pointers, whenever values[lo] + values[hi] < target
        # every index between them also pairs with lo, so hi - lo pairs are
        # counted at once. Values lie in [-50, 50], so each sum and the count
        # stay far inside 32-bit range.
        values = sorted(nums)
        answer = 0
        lo, hi = 0, len(values) - 1
        while lo < hi:
            if values[lo] + values[hi] < target:
                answer += hi - lo
                lo += 1
            else:
                hi -= 1
        return answer
