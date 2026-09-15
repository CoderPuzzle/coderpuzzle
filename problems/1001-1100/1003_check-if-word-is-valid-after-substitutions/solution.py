class Solution:
    def isValid(self, s: str) -> bool:
        # Every insertion of "abc" is reversible: removing an "abc"
        # substring from a valid string leaves another valid string, all
        # the way back to "". A stack turns that reversal into one pass —
        # whenever the top three entries read a, b, c, they are the most
        # recently completed insertion, so popping all three undoes it.
        stack = []
        for character in s:
            stack.append(character)
            if len(stack) >= 3 and stack[-3] == "a" and stack[-2] == "b" and stack[-1] == "c":
                del stack[-3:]
        # s was reachable by the operation iff nothing is left over.
        return not stack
