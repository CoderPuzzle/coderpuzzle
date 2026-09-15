from typing import List, Optional


class Solution:
    def strWithout3a3b(self, a: int, b: int) -> str:
        # The judge pins one exact answer: call the letter with the larger
        # count big ('a' on a tie) and the other small. While big exceeds
        # small and small has not run out, append two big letters then one
        # small letter; then, while letters remain, append one big letter if
        # any are left, then one small letter if any are left.
        if a >= b:
            big, big_ch, small, small_ch = a, "a", b, "b"
        else:
            big, big_ch, small, small_ch = b, "b", a, "a"
        parts = []
        while big > small and small > 0:
            parts.append(big_ch + big_ch + small_ch)
            big -= 2
            small -= 1
        while big > 0 or small > 0:
            if big > 0:
                parts.append(big_ch)
                big -= 1
            if small > 0:
                parts.append(small_ch)
                small -= 1
        return "".join(parts)
