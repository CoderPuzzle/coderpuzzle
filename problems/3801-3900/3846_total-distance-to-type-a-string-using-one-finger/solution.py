from typing import List, Optional


class Solution:
    def totalDistance(self, s: str) -> int:
        # The keyboard is three ragged rows — qwertyuiop, asdfghjkl,
        # zxcvbnm — so recording each letter's (row, col) cell once turns
        # the answer into a running Manhattan sum: the finger starts on
        # 'a', and each typed letter adds |r1 - r2| + |c1 - c2| for the
        # move from the previous key.
        row = [0] * 26
        col = [0] * 26
        for r, keys in enumerate(("qwertyuiop", "asdfghjkl", "zxcvbnm")):
            for c, ch in enumerate(keys):
                row[ord(ch) - 97] = r
                col[ord(ch) - 97] = c
        total = 0
        pr, pc = row[0], col[0]
        for ch in s:
            i = ord(ch) - 97
            total += abs(pr - row[i]) + abs(pc - col[i])
            pr, pc = row[i], col[i]
        return total
