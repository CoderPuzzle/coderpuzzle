from typing import List, Optional


class Solution:
    def thirdMax(self, nums: List[int]) -> int:
        # None marks a slot not yet filled, so even -2147483648 is a legal
        # value and no sentinel constant is needed.
        first: Optional[int] = None
        second: Optional[int] = None
        third: Optional[int] = None
        for value in nums:
            # A repeat of an already-tracked value changes nothing.
            if value == first or value == second or value == third:
                continue
            if first is None or value > first:
                third = second
                second = first
                first = value
            elif second is None or value > second:
                third = second
                second = value
            elif third is None or value > third:
                third = value
        # No third distinct maximum: fall back to the maximum.
        return third if third is not None else first
