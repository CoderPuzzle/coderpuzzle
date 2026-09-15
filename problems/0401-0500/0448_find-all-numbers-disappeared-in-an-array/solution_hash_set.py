from typing import List


class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        # The direct reading: record every value in a hash set, then walk the
        # candidate range 1..n and keep the values the set does not hold.
        seen = set(nums)
        # The set carries no order of its own; walking the candidates in
        # increasing order is what makes the pinned ascending output free.
        return [value for value in range(1, len(nums) + 1) if value not in seen]
