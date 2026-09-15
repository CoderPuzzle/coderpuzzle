from typing import List, Optional


class Solution:
    def evaluateExpression(self, expression: str) -> int:
        # One recursive parse(i) -> (value, next index) covers the whole
        # grammar; the leading character picks the branch.
        def parse(i):
            ch = expression[i]
            # A digit or '-' starts a literal: optional sign, then digits.
            if ch == "-" or ch.isdigit():
                j = i + 1 if ch == "-" else i
                while j < len(expression) and expression[j].isdigit():
                    j += 1
                return int(expression[i:j]), j
            # Otherwise a three-letter operator; +4 lands just past "op(".
            op = expression[i : i + 3]
            i += 4
            a, i = parse(i)
            i += 1  # skip ","
            b, i = parse(i)
            i += 1  # skip ")"
            # Apply the operator to the two sub-results as the recursion
            # unwinds (bottom-up); floor division matches exact quotients.
            if op == "add":
                return a + b, i
            if op == "sub":
                return a - b, i
            if op == "mul":
                return a * b, i
            return a // b, i

        value, _ = parse(0)
        return value
