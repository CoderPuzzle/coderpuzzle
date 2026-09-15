from typing import List, Optional


class Solution:
    def addRungs(self, rungs: List[int], dist: int) -> int:
        # Greedy: bridge each gap with as few rungs as possible, placing
        # each new rung as high as the current position allows. A gap of g
        # between two heights needs ceil(g / dist) - 1 extra rungs.
        added = 0
        current = 0
        for height in rungs:
            gap = height - current
            added += (gap - 1) // dist
            current = height
        return added
