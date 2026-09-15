from typing import List, Optional


class Solution:
    def partitionLabels(self, s: str) -> List[int]:
        # A part must extend to the last occurrence of every letter it
        # contains, so record where each letter finally appears.
        last = {}
        for i, c in enumerate(s):
            last[c] = i
        parts = []
        start = 0
        end = 0
        for i, c in enumerate(s):
            # end = farthest last occurrence among letters opened so far.
            end = max(end, last[c])
            # i == end: every letter opened in this span also closes in
            # it, so a cut here is legal.
            if i == end:
                parts.append(end - start + 1)
                start = i + 1
        # Cutting at the earliest legal index maximizes the parts: any
        # valid partition respects these boundaries, and delaying a cut
        # only merges parts.
        return parts
