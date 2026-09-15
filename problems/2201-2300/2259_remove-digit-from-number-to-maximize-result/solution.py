from typing import List


class Solution:
    def removeDigit(self, number: str, digit: str) -> str:
        best = None
        for i, ch in enumerate(number):
            if ch == digit:
                candidate = number[:i] + number[i + 1 :]
                if best is None or candidate > best:
                    best = candidate
        return best
