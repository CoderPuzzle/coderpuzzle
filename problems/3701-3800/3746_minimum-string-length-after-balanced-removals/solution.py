from typing import List, Optional


class Solution:
    def minLengthAfterRemovals(self, s: str) -> int:
        # Every operation deletes one 'a' together with one 'b', so the
        # difference between the two counts never changes; while both letters
        # remain some adjacent pair differs, and deleting such pairs one after
        # another boils the string down to exactly that difference.
        count_a = s.count("a")
        count_b = len(s) - count_a
        return abs(count_a - count_b)
