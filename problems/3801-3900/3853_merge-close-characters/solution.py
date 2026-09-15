from typing import List, Optional


class Solution:
    def mergeCharacters(self, s: str, k: int) -> str:
        # The stack holds the settled prefix: survivors with no close pair
        # among them. A merge always deletes the right member, so the incoming
        # char — the rightmost — either finds an equal survivor within distance
        # k (its position is len(stack), so the window is the last k survivors)
        # and vanishes, or it settles on top. One sweep replays the rule.
        stack: List[str] = []
        for c in s:
            if c in stack[-k:]:
                continue
            stack.append(c)
        return "".join(stack)
