from typing import List


class Solution:
    def braceExpansionII(self, expression: str) -> List[str]:
        # Iterative stack machine. `cur` holds the words of the
        # concatenation so far; a '{' pushes it as a saved prefix and
        # starts a group whose comma-separated alternatives accumulate in a
        # union slot; a '}' closes the group and concatenates its union
        # back onto the saved prefix.
        stack = []
        cur = {""}
        for c in expression:
            if c == "{":
                stack.append(cur)
                stack.append(None)  # group union slot
                cur = {""}
            elif c == ",":
                top = stack[-1]
                stack[-1] = cur if top is None else top | cur
                cur = {""}
            elif c == "}":
                top = stack[-1]
                group = cur if top is None else top | cur
                stack.pop()
                prev = stack.pop()
                cur = {a + b for a in prev for b in group}
            else:
                cur = {a + c for a in cur}
        return sorted(cur)
