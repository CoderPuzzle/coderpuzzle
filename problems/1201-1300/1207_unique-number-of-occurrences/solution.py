from typing import List


class Solution:
    def uniqueOccurrences(self, arr: List[int]) -> bool:
        # Count every value, then compare the number of distinct values
        # with the number of distinct counts: they match exactly when no
        # two values share an occurrence count.
        counts = {}
        for value in arr:
            counts[value] = counts.get(value, 0) + 1
        return len(counts) == len(set(counts.values()))
