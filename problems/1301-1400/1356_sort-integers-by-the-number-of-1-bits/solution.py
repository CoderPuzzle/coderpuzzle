from typing import List


class Solution:
    def sortByBits(self, arr: List[int]) -> List[int]:
        # The order is the lexicographic order of (popcount, value).
        return sorted(arr, key=lambda value: (bin(value).count("1"), value))
