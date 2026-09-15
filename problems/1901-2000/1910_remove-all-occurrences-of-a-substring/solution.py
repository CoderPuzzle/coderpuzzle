class Solution:
    def removeOccurrences(self, s: str, part: str) -> str:
        # Stream s through a survivor stack. A removal can only expose
        # characters at the top, so after each push the last len(part)
        # chars are checked and popped when they spell out part — the
        # freshly exposed top then gets its own chance on a later push.
        m = len(part)
        stack = []
        for ch in s:
            stack.append(ch)
            if len(stack) >= m and stack[-m:] == list(part):
                del stack[-m:]
        return "".join(stack)
