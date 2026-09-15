from typing import List, Optional


class Solution:
    def calculate(self, s: str) -> int:
        # Only + and - appear, so the whole expression reduces to summing
        # signed terms: `result` is the running sum, `sign` the pending sign
        # of the next term, `num` the multi-digit number being assembled.
        result = 0
        sign = 1
        num = 0
        stack = []
        for ch in s:
            if ch.isdigit():
                num = num * 10 + int(ch)
            elif ch == "+":
                # Fold the finished term in and record the next sign.
                result += sign * num
                num = 0
                sign = 1
            elif ch == "-":
                # A leading '-' needs no special casing: it simply leaves
                # sign = -1 for the next term or group.
                result += sign * num
                num = 0
                sign = -1
            elif ch == "(":
                # Save the outer context and evaluate the group afresh.
                stack.append(result)
                stack.append(sign)
                result = 0
                sign = 1
            elif ch == ")":
                result += sign * num
                num = 0
                # sign was pushed last, so it pops first: apply it to the
                # inner value and add the saved outer result back.
                result = result * stack.pop() + stack.pop()
            # spaces are ignored
        # Fold in the final pending term.
        return result + sign * num
