from typing import List


class Solution:
    def shiftingLetters(self, s: str, shifts: List[int]) -> str:
        # Letter i is advanced once by every shifts[j] with j >= i, so its
        # total shift is the suffix sum shifts[i..n-1] — one running total
        # on a right-to-left scan replaces all the prefix operations.
        out = []
        total = 0
        for i in range(len(s) - 1, -1, -1):
            total += shifts[i]
            # Shifts are non-negative, so % 26 lands the wrap z -> a exactly.
            out.append(chr((ord(s[i]) - 97 + total) % 26 + 97))
        return "".join(reversed(out))
