from typing import List, Optional


class Solution:
    def lexSmallest(self, s: str) -> str:
        # Reversing a single character changes nothing, so s itself is
        # always one of the reachable strings and seeds the minimum.
        n = len(s)
        best = s
        # Flip the first k characters: the reversed head lands in front of
        # whatever the operation left untouched.
        for k in range(2, n + 1):
            best = min(best, s[:k][::-1] + s[k:])
        # Flip the last k characters: the untouched head keeps its order
        # while the reversed tail closes the string.
        for k in range(2, n + 1):
            head = n - k
            best = min(best, s[:head] + s[head:][::-1])
        return best
