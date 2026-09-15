from typing import List, Optional


class Solution:
    def isValid(self, s: str) -> bool:
        # Map each closer to its required opener, so the expected partner of
        # any closing bracket is a single lookup.
        pairs = {")": "(", "]": "[", "}": "{"}
        stack = []
        for ch in s:
            # Openers are pushed: the most recently opened bracket is always
            # the one that must close next -- a LIFO discipline the stack
            # models directly.
            if ch in "([{":
                stack.append(ch)
            # One combined test: an empty stack means nothing is open, so the
            # closer is unmatched, and the pop doubles as the match check
            # against the opener this closer requires.
            elif not stack or stack.pop() != pairs[ch]:
                return False
        # Valid exactly when nothing is left open; catches inputs like "(((".
        return not stack
