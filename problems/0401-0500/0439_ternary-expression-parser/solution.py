class Solution:
    def parseTernary(self, expression: str) -> str:
        # Ternaries group right-to-left, so the subexpression closest to the
        # right end is always complete first. Scanning backwards therefore
        # meets every operand before the '?' that needs it.
        stack = []
        i = len(expression) - 1
        while i >= 0:
            c = expression[i]
            if c != "?":
                stack.append(c)
            else:
                true_branch = stack.pop()
                stack.pop()  # the ':' separating the two branches
                false_branch = stack.pop()
                # The character just left of the '?' is the condition ('T' or
                # 'F'); it belongs to this conditional, so consume it as well.
                condition = expression[i - 1]
                stack.append(true_branch if condition == "T" else false_branch)
                i -= 1
            i -= 1
        return stack.pop()
