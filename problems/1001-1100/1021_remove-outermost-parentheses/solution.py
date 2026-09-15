from typing import List, Optional


class Solution:
    def removeOuterParentheses(self, s: str) -> str:
        result = []
        depth = 0
        for ch in s:
            if ch == "(":
                # Keep it only if some other primitive block is already
                # open; an outermost '(' opens at depth 0 and is dropped.
                if depth > 0:
                    result.append(ch)
                depth += 1
            else:
                # Close the block first, then keep the character only if
                # it did not just bring the depth back to 0.
                depth -= 1
                if depth > 0:
                    result.append(ch)
        return "".join(result)
