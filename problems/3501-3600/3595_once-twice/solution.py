from typing import List, Optional


class Solution:
    def onceTwice(self, nums: List[int]) -> List[int]:
        from collections import Counter

        # Exactly one value occurs once, one occurs twice, the rest thrice;
        # a frequency table over the distinct values finds the two specials.
        counts = Counter(nums)
        once = twice = 0
        # First answer is the count-1 value, second the count-2 value.
        for value, count in counts.items():
            if count == 1:
                once = value
            elif count == 2:
                twice = value
        return [once, twice]
