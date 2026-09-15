from typing import List


class Solution:
    def minimumIndex(self, capacity: List[int], itemSize: int) -> int:
        # The earliest index wins ties, so only a strictly smaller
        # fitting capacity replaces the current best.
        best_index = -1
        best_capacity = None
        for i, c in enumerate(capacity):
            if c >= itemSize and (best_capacity is None or c < best_capacity):
                best_capacity = c
                best_index = i
        return best_index
