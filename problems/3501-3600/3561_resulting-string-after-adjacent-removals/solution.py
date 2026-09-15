class Solution:
    def resultingString(self, s: str) -> str:
        # Left-to-right stack: a fresh character cancels the top when the
        # two are circular-adjacent; the pair exposed by a pop is exactly
        # the next pair the leftmost-first rule would remove.
        stack = []
        for ch in s:
            if stack and (ord(stack[-1]) - ord(ch)) % 26 in (1, 25):
                stack.pop()
            else:
                stack.append(ch)
        return "".join(stack)
