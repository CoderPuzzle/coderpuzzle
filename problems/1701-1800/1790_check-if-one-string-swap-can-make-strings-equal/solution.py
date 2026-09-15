from typing import List, Optional


class Solution:
    def areAlmostEqual(self, s1: str, s2: str) -> bool:
        # One swap repairs exactly two positions, and only when their
        # characters are crossed between the two strings.
        i = j = -1
        for k, (a, b) in enumerate(zip(s1, s2)):
            if a != b:
                if i == -1:
                    i = k
                elif j == -1:
                    j = k
                else:
                    return False
        if j == -1:
            return i == -1
        return s1[i] == s2[j] and s1[j] == s2[i]
