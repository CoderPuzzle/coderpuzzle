from typing import List, Optional


class Solution:
    def thousandSeparator(self, n: int) -> str:
        # Reverse the digit string, cut it into runs of three, join with
        # '.', then reverse back — the chunk boundaries land exactly on
        # multiples of three counted from the units digit.
        digits = str(n)[::-1]
        groups = [digits[i : i + 3] for i in range(0, len(digits), 3)]
        return ".".join(groups)[::-1]
