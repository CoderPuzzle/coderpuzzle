from typing import List, Optional


class Solution:
    def robotWithString(self, s: str) -> str:
        n = len(s)
        # t behaves as a stack: characters enter in s's order and leave
        # from the end, so the paper receives some pop sequence.
        high = chr(127)
        # suffix_min[i] = smallest char still to arrive from s[i:]; the
        # sentinel at n exceeds every letter and also serves the drain.
        suffix_min = [high] * (n + 1)
        for i in range(n - 1, -1, -1):
            suffix_min[i] = min(s[i], suffix_min[i + 1])
        stack = []
        out = []
        for i in range(n):
            # Pop the top while nothing smaller remains unread: writing it
            # now is never wrong, since later arrivals are >= top. Ties pop
            # early too — safe and never a wasted hold.
            while stack and stack[-1] <= suffix_min[i]:
                out.append(stack.pop())
            stack.append(s[i])
        # Input exhausted: flush the rest (the sentinel makes this the
        # same condition as the main loop).
        while stack:
            out.append(stack.pop())
        return "".join(out)
