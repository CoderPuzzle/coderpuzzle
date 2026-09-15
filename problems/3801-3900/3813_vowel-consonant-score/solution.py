from typing import List, Optional


class Solution:
    def vowelConsonantScore(self, s: str) -> int:
        # One pass tallies both totals: each character either is one of
        # the five vowels and bumps v, is another lowercase letter and
        # bumps c, or is a space or digit and bumps neither. The score is
        # then the integer quotient floor(v / c), or 0 when no consonant
        # exists to divide by.
        v = 0
        c = 0
        for ch in s:
            if ch in "aeiou":
                v += 1
            elif "a" <= ch <= "z":
                c += 1
        return v // c if c else 0
