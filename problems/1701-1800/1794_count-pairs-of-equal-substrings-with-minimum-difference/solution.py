from typing import List, Optional


class Solution:
    def countQuadruples(self, firstString: str, secondString: str) -> int:
        # Only single-character pairs can be optimal: a longer match
        # shrinks to its two leading characters (same a, smaller j), and
        # each letter does best pairing its first occurrence here with
        # its last occurrence there.
        n1 = len(firstString)
        first = [n1] * 26
        last = [-1] * 26
        for i, ch in enumerate(firstString):
            c = ord(ch) - ord("a")
            if first[c] == n1:
                first[c] = i
        for a, ch in enumerate(secondString):
            last[ord(ch) - ord("a")] = a
        best = None
        count = 0
        for c in range(26):
            if first[c] == n1 or last[c] == -1:
                continue
            diff = first[c] - last[c]
            if best is None or diff < best:
                best = diff
                count = 1
            elif diff == best:
                count += 1
        return count
