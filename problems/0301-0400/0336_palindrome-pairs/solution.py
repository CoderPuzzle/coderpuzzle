from typing import List, Optional


class Solution:
    def palindromePairs(self, words: List[str]) -> List[List[int]]:
        # word -> index: partners are found by hash lookup, not pair scanning.
        index = {w: i for i, w in enumerate(words)}
        results = set()

        def is_palindrome(s: str) -> bool:
            return s == s[::-1]

        for j, w in enumerate(words):
            length = len(w)
            # For a concatenation to be a palindrome, one half of w must
            # already be one and the mirror of the other half must exist.
            for cut in range(length + 1):
                prefix = w[:cut]
                suffix = w[cut:]
                # Palindromic prefix: reverse(suffix) can stand on the left.
                # The != j check stops a word from pairing with itself.
                if is_palindrome(prefix):
                    rev = suffix[::-1]
                    if rev in index and index[rev] != j:
                        results.add((index[rev], j))
                # Palindromic suffix: reverse(prefix) goes on the right.
                # cut != length avoids re-emitting the full-string case,
                # which the partner word already finds at its cut 0.
                if cut != length and is_palindrome(suffix):
                    rev = prefix[::-1]
                    if rev in index and index[rev] != j:
                        results.add((j, index[rev]))
        return sorted([list(pair) for pair in results])
