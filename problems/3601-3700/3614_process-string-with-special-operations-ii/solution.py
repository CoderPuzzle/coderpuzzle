from typing import List, Optional


class Solution:
    def processStr(self, s: str, k: int) -> str:
        # First pass: the length of the result after each prefix. '#' doubles
        # it, '*' drops one (never below zero), a letter adds one, '%' leaves
        # it untouched. The result can reach 10^15 characters, so the string
        # itself is never built - only these lengths are kept.
        length = [0] * (len(s) + 1)
        for i, ch in enumerate(s):
            if ch == "*":
                length[i + 1] = max(0, length[i] - 1)
            elif ch == "#":
                length[i + 1] = length[i] * 2
            elif ch == "%":
                length[i + 1] = length[i]
            else:
                length[i + 1] = length[i] + 1
        if k >= length[-1]:
            return "."
        # Walk backwards, undoing each operation to map position k of the
        # final string back to the letter that produced it. The length array
        # pins down where each duplication and reversal boundary sits, so
        # every step is arithmetic, not string work.
        pos = k
        for i in range(len(s) - 1, -1, -1):
            ch = s[i]
            if ch == "*":
                # Removing the tail keeps every earlier position.
                pass
            elif ch == "#":
                if pos >= length[i]:
                    pos -= length[i]
            elif ch == "%":
                pos = length[i] - 1 - pos
            elif pos == length[i]:
                return ch
        return "."
