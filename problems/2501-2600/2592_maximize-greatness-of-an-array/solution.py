from typing import List


class Solution:
    def maximizeGreatness(self, nums: List[int]) -> int:
        # Sort the array; then scan a second sorted copy of the same
        # multiset with a fast pointer that always offers the smallest not
        # yet committed value strictly greater than the current element.
        # Spending the cheapest sufficient value on each position in
        # increasing order is an exchange-argument optimum, so the number
        # of commitments is the greatness.
        arr = sorted(nums)
        supply = sorted(nums)
        count = 0
        j = 0
        for x in arr:
            while j < len(supply) and supply[j] <= x:
                j += 1
            if j == len(supply):
                break
            count += 1
            j += 1
        return count
