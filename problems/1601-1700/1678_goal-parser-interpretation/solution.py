from typing import List, Optional


class Solution:
    def interpret(self, command: str) -> str:
        # Scan left to right. 'G' emits "G" and advances 1. An open paren
        # can only begin "()" or "(al)": peek the next character — ')'
        # emits "o" and advances 2, 'a' emits "al" and advances 4.
        out = []
        i = 0
        while i < len(command):
            if command[i] == "G":
                out.append("G")
                i += 1
            elif command[i + 1] == ")":
                out.append("o")
                i += 2
            else:
                out.append("al")
                i += 4
        return "".join(out)
