from typing import List


class Solution:
    def isPossibleToRearrange(self, s: str, t: str, k: int) -> bool:
        # The rearrangement exists exactly when the two chunk multisets
        # match: any order of t's chunks is reachable, and every piece of
        # s must be consumed whole. Hash-counting makes the comparison a
        # single O(n) pass over the two chunk sequences.
        size = len(s) // k
        counts = {}
        for i in range(k):
            chunk = s[i * size : (i + 1) * size]
            counts[chunk] = counts.get(chunk, 0) + 1
        for i in range(k):
            chunk = t[i * size : (i + 1) * size]
            left = counts.get(chunk, 0)
            if left == 0:
                return False
            counts[chunk] = left - 1
        return True
