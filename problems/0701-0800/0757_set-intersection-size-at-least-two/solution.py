from typing import List, Optional


class Solution:
    def intersectionSizeTwo(self, intervals: List[List[int]]) -> int:
        # Greedy: sort by right endpoint ascending, then left endpoint descending.
        ivs = sorted(intervals, key=lambda iv: (iv[1], -iv[0]))
        # Chosen points stay in non-decreasing order, so the points inside any
        # [s, e] are exactly the trailing run of `chosen` — checking the last
        # two suffices to know how many already lie in the interval.
        chosen = []
        for s, e in ivs:
            m = len(chosen)
            if m >= 2 and chosen[m - 2] >= s:
                continue
            if m >= 1 and chosen[m - 1] >= s:
                chosen.append(e)
            else:
                chosen.append(e - 1)
                chosen.append(e)
        return len(chosen)
