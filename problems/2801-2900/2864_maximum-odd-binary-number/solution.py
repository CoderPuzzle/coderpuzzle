from typing import List, Optional


class Solution:
    def maximumOddBinaryNumber(self, s: str) -> str:
        # Parity fixes the last bit: one '1' must sit in the final position,
        # so push every remaining '1' to the front and let all '0's slot in
        # between them and that trailing one.
        ones = s.count("1")
        return "1" * (ones - 1) + "0" * (len(s) - ones) + "1"
