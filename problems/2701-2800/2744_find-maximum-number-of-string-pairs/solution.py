from typing import List, Optional


class Solution:
    def maximumNumberOfStringPairs(self, words: List[str]) -> int:
        # A word pairs only with its reversal among earlier words: look up
        # before inserting, so a word can never pair with itself. Distinct
        # strings make each candidate partner unique, so counting every hit
        # is optimal — palindromes can never find an earlier copy at all.
        seen = set()
        pairs = 0
        for word in words:
            if word[::-1] in seen:
                pairs += 1
            seen.add(word)
        return pairs
