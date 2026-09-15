from typing import List, Optional


class Solution:
    def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:
        # counts holds the multiplicities inside the window [left, right];
        # erasing a key at zero keeps len(counts) = distinct characters.
        counts = {}
        left = 0
        best = 0
        for right, ch in enumerate(s):
            counts[ch] = counts.get(ch, 0) + 1
            # Shrink until valid: every superset of an invalid window is
            # invalid too, so shrinking from the left skips no candidate.
            while len(counts) > k:
                c = s[left]
                counts[c] -= 1
                if counts[c] == 0:
                    del counts[c]
                left += 1
            # Now the longest valid window ending at right is in hand.
            if right - left + 1 > best:
                best = right - left + 1
        return best
