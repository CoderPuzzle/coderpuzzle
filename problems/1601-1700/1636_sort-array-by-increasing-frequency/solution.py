from collections import Counter
from typing import List


class Solution:
    def frequencySort(self, nums: List[int]) -> List[int]:
        # Count each value's frequency, then sort by a composite key:
        # frequency ascending, value descending (via negation) breaks ties.
        freq = Counter(nums)
        return sorted(nums, key=lambda value: (freq[value], -value))
