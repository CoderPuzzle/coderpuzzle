from typing import List, Optional


class Solution:
    def maxDepth(self, s: str) -> int:
        # s is guaranteed to be a VPS, so a running depth counter suffices:
        # '(' increments it, ')' decrements it, everything else is skipped.
        depth = 0
        best = 0
        for ch in s:
            if ch == "(":
                depth += 1
                best = max(best, depth)
            elif ch == ")":
                depth -= 1
        return best
