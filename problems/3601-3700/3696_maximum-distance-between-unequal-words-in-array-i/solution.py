from typing import List


class Solution:
    def maxDistance(self, words: List[str]) -> int:
        # Starting best at 0 bakes in the sentinel: only a genuinely
        # unequal pair can raise it, so an all-equal array (or a single
        # word, which has no pairs at all) returns 0 untouched.
        best = 0
        n = len(words)
        # Check every index pair once; each unequal pair contributes
        # j - i + 1, counting both endpoints.
        for i in range(n):
            for j in range(i + 1, n):
                if words[i] != words[j]:
                    best = max(best, j - i + 1)
        return best
