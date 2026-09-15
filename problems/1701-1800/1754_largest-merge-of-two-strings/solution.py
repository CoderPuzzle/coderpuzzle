from typing import List, Optional


class Solution:
    def largestMerge(self, word1: str, word2: str) -> str:
        # Take the next character from whichever REMAINING string is
        # lexicographically larger — the suffix comparison settles not
        # just differing heads but the tie case.
        out = []
        a, b = word1, word2
        while a and b:
            if a > b:
                out.append(a[0])
                a = a[1:]
            else:
                out.append(b[0])
                b = b[1:]
        return "".join(out) + a + b
