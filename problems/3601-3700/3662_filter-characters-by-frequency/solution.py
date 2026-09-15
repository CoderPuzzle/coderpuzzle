from typing import List, Optional


class Solution:
    def filterCharacters(self, s: str, k: int) -> str:
        # Tally every occurrence into a fixed 26-slot table; the
        # lowercase-only input makes each index a plain ord() offset.
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - ord("a")] += 1
        # Scan left to right, keeping exactly the characters whose total
        # count is strictly below the threshold; original order falls out
        # of the scan for free.
        return "".join(ch for ch in s if counts[ord(ch) - ord("a")] < k)
