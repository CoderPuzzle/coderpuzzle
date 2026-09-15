from typing import List


class Solution:
    def similarPairs(self, words: List[str]) -> int:
        # Similarity ignores multiplicity and order: a 26-bit signature with
        # one bit per letter identifies each character set, and counting
        # earlier occurrences of the running signature adds every pair it
        # forms without re-scanning previous words.
        counts = {}
        total = 0
        for word in words:
            signature = 0
            for ch in word:
                signature |= 1 << (ord(ch) - ord("a"))
            total += counts.get(signature, 0)
            counts[signature] = counts.get(signature, 0) + 1
        return total
