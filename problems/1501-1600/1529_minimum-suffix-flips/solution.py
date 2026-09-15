from typing import List, Optional


class Solution:
    def minFlips(self, target: str) -> int:
        # `current` tracks the bit the string holds at the position just
        # processed, starting from the initial all-zero string. Each
        # mismatch means the suffix from here on needs one more flip, and
        # flips the tracked bit to match.
        current = "0"
        count = 0
        for c in target:
            if c != current:
                count += 1
                current = c
        return count
