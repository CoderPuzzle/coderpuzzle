from typing import List, Optional


class Solution:
    def maximumRemovals(self, s: str, p: str, removable: List[int]) -> int:
        # Classic greedy subsequence scan: skipping removed positions, match each
        # character of p at the earliest opportunity (optimal for containment).
        def still_subsequence(removed):
            pi = 0
            plen = len(p)
            for i, ch in enumerate(s):
                if i in removed:
                    continue
                if pi < plen and ch == p[pi]:
                    pi += 1
            return pi == plen

        # Feasibility is monotone (fewer deletions only restore characters), so the
        # workable k form an interval starting at 0 — binary search its right end.
        lo, hi = 0, len(removable)
        while lo < hi:
            # Upper-mid form keeps the search converging toward the largest feasible k.
            mid = (lo + hi + 1) // 2
            if still_subsequence(set(removable[:mid])):
                lo = mid
            else:
                hi = mid - 1
        return lo
