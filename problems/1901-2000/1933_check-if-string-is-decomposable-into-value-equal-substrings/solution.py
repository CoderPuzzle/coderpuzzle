from typing import List, Optional


class Solution:
    def isDecomposable(self, s: str) -> bool:
        # A run is a maximal block of equal digits. A run of length L must
        # split into 3-length pieces plus at most one 2-length piece, so
        # L % 3 is 0 (no 2) or 2 (one 2); L % 3 == 1 can never be split.
        twos = 0
        i = 0
        n = len(s)
        while i < n:
            j = i
            while j < n and s[j] == s[i]:
                j += 1
            length = j - i
            if length % 3 == 1:
                return False
            if length % 3 == 2:
                twos += 1
                if twos > 1:
                    return False
            i = j
        return twos == 1
