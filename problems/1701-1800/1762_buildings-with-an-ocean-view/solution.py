from typing import List, Optional


class Solution:
    def findBuildings(self, heights: List[int]) -> List[int]:
        # A building sees the ocean iff it strictly exceeds the max of
        # everything to its right; sweep inland carrying that max.
        out = []
        tallest = 0
        for i in range(len(heights) - 1, -1, -1):
            if heights[i] > tallest:
                out.append(i)
                tallest = heights[i]
        out.reverse()
        return out
