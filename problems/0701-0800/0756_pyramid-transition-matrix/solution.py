from typing import List, Optional


class Solution:
    def pyramidTransition(self, bottom: str, allowed: List[str]) -> bool:
        # tops[(a, b)] = bitmask of letters that may sit on the pair
        # (a, b). A pair with no pattern is a dead end: its mask stays 0.
        tops = {}
        for t in allowed:
            key = (t[0], t[1])
            tops[key] = tops.get(key, 0) | (1 << (ord(t[2]) - 65))
        rows = {bottom}
        width = len(bottom)
        while width > 1:
            above = set()
            for row in rows:
                # Candidate letters per position of the row above; a zero
                # mask means this row cannot carry anything.
                masks = [tops.get((row[i], row[i + 1]), 0) for i in range(width - 1)]
                if 0 in masks:
                    continue
                # The state stays a whole concrete row: adjacent positions
                # above share the row below, so the letter at one position
                # constrains its neighbor. Enumerate the product of the
                # masks; the set dedups rows lifted from different parents.
                frontier = [""]
                for mask in masks:
                    opts = [chr(65 + d) for d in range(6) if mask >> d & 1]
                    frontier = [r + ch for r in frontier for ch in opts]
                above.update(frontier)
            if not above:
                return False
            rows = above
            width -= 1
        return True
