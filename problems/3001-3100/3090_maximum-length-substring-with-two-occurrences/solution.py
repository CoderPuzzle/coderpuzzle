from typing import List


class Solution:
    def maximumLengthSubstring(self, s: str) -> int:
        # Slide a window over s while tracking one count per letter: grow on
        # the right each step, then shrink from the left only while the
        # freshly added letter would exceed its budget of two occurrences.
        counts = [0] * 26
        best = 0
        left = 0
        for right, ch in enumerate(s):
            index = ord(ch) - ord("a")
            counts[index] += 1
            # Only the just-extended letter can be over budget, so the
            # window never has to shrink past its first offender.
            while counts[index] > 2:
                counts[ord(s[left]) - ord("a")] -= 1
                left += 1
            if right - left + 1 > best:
                best = right - left + 1
        return best
