from typing import List, Optional


class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        m, n = len(s1), len(s2)
        # No window of length m can exist inside a shorter s2.
        if m > n:
            return False
        need = [0] * 26
        window = [0] * 26
        a = ord("a")
        for ch in s1:
            need[ord(ch) - a] += 1
        for ch in s2[:m]:
            window[ord(ch) - a] += 1
        # Matching frequency vectors means the window is a permutation of s1.
        if window == need:
            return True
        for i in range(m, n):
            # Slide one position: add the entering char, drop the leaving one.
            window[ord(s2[i]) - a] += 1
            left = ord(s2[i - m]) - a
            window[left] -= 1
            if window == need:
                return True
        return False
