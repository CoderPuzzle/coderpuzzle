from typing import List, Optional


class Solution:
    def shortestSuperstring(self, s1: str, s2: str) -> str:
        # Containment first: the shorter answer is then always a merge that
        # overlaps a suffix of one string with a prefix of the other, so the
        # scan takes the largest such overlap in either direction and lets
        # the first direction win ties.
        def max_overlap(a: str, b: str) -> int:
            for k in range(min(len(a), len(b)), 0, -1):
                if a[-k:] == b[:k]:
                    return k
            return 0

        if s2 in s1:
            return s1
        if s1 in s2:
            return s2
        ov1 = max_overlap(s1, s2)  # suffix of s1 == prefix of s2
        ov2 = max_overlap(s2, s1)
        if ov1 >= ov2:
            return s1 + s2[ov1:]
        return s2 + s1[ov2:]
