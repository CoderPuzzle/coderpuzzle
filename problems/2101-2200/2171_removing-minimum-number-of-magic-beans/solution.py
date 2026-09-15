from typing import List


class Solution:
    def minimumRemoval(self, beans: List[int]) -> int:
        # In a sorted layout, keeping bags equal to the value at index i means:
        # remove everything before i entirely, and trim every later bag down
        # to that value. The suffix sum makes each candidate constant time.
        total = sum(beans)
        ordered = sorted(beans)
        best = total  # keep nothing (only wins for degenerate inputs)
        for index, value in enumerate(ordered):
            kept_total = (len(ordered) - index) * value
            best = min(best, total - kept_total)
        return best
