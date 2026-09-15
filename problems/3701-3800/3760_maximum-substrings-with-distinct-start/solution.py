from typing import List, Optional


class Solution:
    def maxDistinctStarts(self, s: str) -> int:
        # A piece is decided by its start: scanning left to right, the
        # current letter may open a new piece exactly when no earlier piece
        # already started with it. Accepting it costs only that one letter's
        # availability, and each letter starts at most one piece anyway, so
        # the greedy never blocks a better split.
        seen = set()
        for ch in s:
            seen.add(ch)
        return len(seen)
