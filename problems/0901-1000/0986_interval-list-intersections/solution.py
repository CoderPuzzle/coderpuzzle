from typing import List, Optional


class Solution:
    def intervalIntersection(self, firstList: List[List[int]], secondList: List[List[int]]) -> List[List[int]]:
        result = []
        i = j = 0
        while i < len(firstList) and j < len(secondList):
            # The overlap of the two current intervals is [max starts,
            # min ends]; lo <= hi means they intersect (closed intervals,
            # so touching endpoints still count).
            lo = max(firstList[i][0], secondList[j][0])
            hi = min(firstList[i][1], secondList[j][1])
            if lo <= hi:
                result.append([lo, hi])
            # Retire the interval that ends earlier: later intervals in the
            # other list start strictly after its end, so it is done forever.
            if firstList[i][1] < secondList[j][1]:
                i += 1
            else:
                j += 1
        return result
