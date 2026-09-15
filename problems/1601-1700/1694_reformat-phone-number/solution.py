from typing import List, Optional


class Solution:
    def reformatNumber(self, number: str) -> str:
        # Strip the separators, then group by remaining length: while more
        # than 4 digits remain, cut a block of 3; the final 4, 3, or 2
        # digits are forced — 4 splits into two blocks of 2, the rest
        # stay whole.
        digits = "".join(c for c in number if c.isdigit())
        blocks = []
        i = 0
        while len(digits) - i > 4:
            blocks.append(digits[i : i + 3])
            i += 3
        tail = digits[i:]
        if len(tail) == 4:
            blocks.append(tail[:2])
            blocks.append(tail[2:])
        else:
            blocks.append(tail)
        return "-".join(blocks)
