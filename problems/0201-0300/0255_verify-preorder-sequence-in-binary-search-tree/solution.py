from typing import List


class Solution:
    def verifyPreorder(self, preorder: List[int]) -> bool:
        # The stack holds the values still open for a left descendant — the
        # current left spine, strictly decreasing. low is the closest ancestor
        # already closed by a larger value; everything after that close
        # descends to its right, so every later value must clear it.
        stack: List[int] = []
        low = None
        for value in preorder:
            # A value below low would have to sit in a closed ancestor's left
            # subtree, which is already finished.
            if low is not None and value < low:
                return False
            # A larger value ends the left subtree of every popped ancestor
            # and takes its place to the right; the deepest popped ancestor is
            # the new bound.
            while stack and stack[-1] < value:
                low = stack.pop()
            stack.append(value)
        return True
