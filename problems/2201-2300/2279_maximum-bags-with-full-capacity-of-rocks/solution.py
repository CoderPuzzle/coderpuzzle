from typing import List


class Solution:
    def maximumBags(self, capacity: List[int], rocks: List[int], additionalRocks: int) -> int:
        needs = sorted(c - r for c, r in zip(capacity, rocks))
        remaining = additionalRocks
        full = 0
        for need in needs:
            if need > remaining:
                break
            remaining -= need
            full += 1
        return full
