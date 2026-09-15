from typing import List, Optional


class Solution:
    def minimumPartition(self, s: str, k: int) -> int:
        # Greedy from the left: keep gluing digits onto the current piece
        # while its value stays <= k. Splitting as late as possible is
        # optimal because a maximal piece can mimic every cut a shorter
        # piece could take, so no earlier split ever wins.
        pieces = 1
        value = 0
        for ch in s:
            digit = ord(ch) - ord("0")
            candidate = value * 10 + digit
            if candidate <= k:
                value = candidate
            else:
                # This digit must open a new piece; fail if it cannot stand
                # alone either.
                if digit > k:
                    return -1
                pieces += 1
                value = digit
        return pieces
