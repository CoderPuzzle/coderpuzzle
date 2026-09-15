from typing import List


class Solution:
    def maxTotal(self, value: List[int], limit: List[int]) -> int:
        # A limit-L element can only be taken while fewer than L elements
        # are active, and the moment the count reaches L the rest of its
        # group locks out forever — so each group contributes at most its
        # min(L, m) largest values. Sorting by value descending and capping
        # each group at L picks collects exactly those.
        taken = [0] * (len(value) + 1)
        total = 0
        for v, l in sorted(zip(value, limit), reverse=True):
            if taken[l] < l:
                taken[l] += 1
                total += v
        return total
