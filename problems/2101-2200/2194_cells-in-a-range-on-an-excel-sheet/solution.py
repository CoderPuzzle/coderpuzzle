from typing import List


class Solution:
    def cellsInRange(self, s: str) -> List[str]:
        # Columns outer, rows inner produces exactly the required order.
        c1, r1, _, c2, r2 = s
        out = []
        for code in range(ord(c1), ord(c2) + 1):
            for row in range(int(r1), int(r2) + 1):
                out.append(chr(code) + str(row))
        return out
