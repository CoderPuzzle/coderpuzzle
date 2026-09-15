from typing import List, Optional


class Solution:
    def reverseParentheses(self, s: str) -> str:
        # fragment stack mirrors the parenthesis nesting; the base fragment
        # is the outermost level and ends up holding the answer
        stack = [[]]
        for ch in s:
            if ch == "(":
                # open a fresh fragment for the new nesting level
                stack.append([])
            elif ch == ")":
                # matching pair complete: reverse the finished fragment and
                # fold it into the level below — reversal composes with nesting
                top = stack.pop()
                stack[-1].extend(reversed(top))
            else:
                # letters accumulate in the innermost current fragment
                stack[-1].append(ch)
        return "".join(stack[0])
