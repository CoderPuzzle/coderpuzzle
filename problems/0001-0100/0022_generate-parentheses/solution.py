from typing import List, Optional


class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        result = []

        def backtrack(current, open_count, close_count):
            # Under the two guards below every leaf reached at length 2n is
            # well-formed by construction, so nothing needs re-validating.
            if len(current) == 2 * n:
                result.append("".join(current))
                return
            # Try '(' first ('(' < ')') so leaves emerge in lexicographic
            # order; it is allowed while fewer than n openings are placed.
            if open_count < n:
                # Append, recurse, pop: one shared path buffer is the working
                # storage for the whole tree.
                current.append("(")
                backtrack(current, open_count + 1, close_count)
                current.pop()
            # ')' only while closings still trail openings -- appending it can
            # never make the prefix invalid.
            if close_count < open_count:
                current.append(")")
                backtrack(current, open_count, close_count + 1)
                current.pop()

        backtrack([], 0, 0)
        return result
