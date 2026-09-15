from typing import List, Optional


class Solution:
    def totalReplacements(self, ranks: List[int]) -> int:
        # One sweep: best is the smallest rank seen so far. A strictly
        # better (lower) arrival displaces it and counts as a replacement;
        # equal or worse ranks leave the selection untouched.
        best = ranks[0]
        replacements = 0
        for rank in ranks[1:]:
            if rank < best:
                best = rank
                replacements += 1
        return replacements
