from typing import List


class Solution:
    def largestValsFromLabels(self, values: List[int], labels: List[int], numWanted: int, useLimit: int) -> int:
        # Greedy: sort items by value descending and take each one while
        # both the per-label cap and the total count allow it.
        items = sorted(zip(values, labels), key=lambda p: -p[0])
        used = {}
        total = 0
        taken = 0
        for value, label in items:
            if taken == numWanted:
                break
            if used.get(label, 0) == useLimit:
                continue
            used[label] = used.get(label, 0) + 1
            total += value
            taken += 1
        return total
