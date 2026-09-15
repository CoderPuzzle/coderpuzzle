from typing import List, Optional


class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        # A window is fixable with k changes iff length - (count of its most
        # frequent char) <= k: the non-majority chars are what get replaced.
        count = [0] * 128
        best = 0
        left = 0
        max_freq = 0
        for right, ch in enumerate(s):
            c = ord(ch)
            count[c] += 1
            # max_freq is only raised, never lowered: a stale high value can
            # merely under-shrink, and each new longest window really contains
            # the char that set it, so validity is preserved.
            if count[c] > max_freq:
                max_freq = count[c]
            # Shrink from the left until the window fits the budget again.
            while (right - left + 1) - max_freq > k:
                count[ord(s[left])] -= 1
                left += 1
            if right - left + 1 > best:
                best = right - left + 1
        return best
