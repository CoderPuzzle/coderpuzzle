class Solution:
    def makeGood(self, s: str) -> str:
        # Walk the string once, keeping a stack of characters kept so far.
        # A new character only ever conflicts with the character directly
        # above it on the stack, because anything further down was already
        # separated from it by characters that didn't cancel. So comparing
        # against just the top is enough to reproduce the full repeated
        # removal process in a single pass.
        stack: List[str] = []
        for ch in s:
            if stack and stack[-1] != ch and stack[-1].lower() == ch.lower():
                stack.pop()
            else:
                stack.append(ch)
        return "".join(stack)
