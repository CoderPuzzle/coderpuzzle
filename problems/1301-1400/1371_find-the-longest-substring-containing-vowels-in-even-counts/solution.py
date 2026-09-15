from typing import List, Optional


class Solution:
    def findTheLongestSubstring(self, s: str) -> int:
        # each vowel toggles one of 5 parity bits in the running mask
        vowels = {"a": 1, "e": 2, "i": 4, "o": 8, "u": 16}
        first = [-2] * 32
        # empty prefix already has even counts, so a whole-prefix window qualifies
        first[0] = -1
        mask = 0
        best = 0
        for i, ch in enumerate(s):
            if ch in vowels:
                mask ^= vowels[ch]
            # equal masks at two indices => all vowel counts even between them;
            # keep only the first occurrence of each mask (earliest maximizes length)
            if first[mask] != -2:
                if i - first[mask] > best:
                    best = i - first[mask]
            else:
                first[mask] = i
        return best
