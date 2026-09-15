from typing import List
from collections import Counter


class Solution:
    def findLeastNumOfUniqueInts(self, arr: List[int], k: int) -> int:
        counts = sorted(Counter(arr).values())
        remaining = len(counts)
        for count in counts:
            if k >= count:
                k -= count
                remaining -= 1
            else:
                break
        return remaining
