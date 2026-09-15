from typing import List


class Solution:
    def twoEditWords(self, queries: List[str], dictionary: List[str]) -> List[str]:
        # A query survives iff some dictionary word differs in at most two
        # positions; the strings are equal-length, so a position count is all
        # it takes.
        result = []
        for q in queries:
            if any(sum(1 for a, b in zip(q, d) if a != b) <= 2 for d in dictionary):
                result.append(q)
        return result
