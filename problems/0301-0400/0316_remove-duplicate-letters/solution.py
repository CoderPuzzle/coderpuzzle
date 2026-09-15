from typing import List, Optional


class Solution:
    def removeDuplicateLetters(self, s: str) -> str:
        # count[ch] = occurrences of ch strictly after the current position.
        count = {}
        for ch in s:
            count[ch] = count.get(ch, 0) + 1
        stack = []
        in_stack = set()
        for ch in s:
            count[ch] -= 1
            # A letter already placed stays put: a second copy can never help.
            if ch in in_stack:
                continue
            # Local exchange: popping a larger top is safe exactly while it
            # still re-occurs later (count > 0), and only shrinks the prefix.
            while stack and stack[-1] > ch and count[stack[-1]] > 0:
                in_stack.remove(stack.pop())
            stack.append(ch)
            in_stack.add(ch)
        return "".join(stack)
