class Solution:
    def calculate(self, s: str) -> int:
        # The expression is a plain sum of terms, each term a maximal chain of
        # */ : defer the additions and apply the operator that PRECEDED the
        # number just read, keeping fully evaluated terms on a stack.
        stack = []
        num = 0
        op = "+"
        last = len(s) - 1
        for i, ch in enumerate(s):
            if ch.isdigit():
                num = num * 10 + int(ch)
            # Two separate ifs: a digit in the last position must both extend
            # num and trigger the final flush (elif would drop the last term).
            if ch in "+-*/" or i == last:
                if op == "+":
                    stack.append(num)
                elif op == "-":
                    stack.append(-num)
                elif op == "*":
                    stack.append(stack.pop() * num)
                else:
                    # Division truncates toward zero; Python's // floors, and
                    # the popped term can be negative — divide absolute values
                    # and reattach the sign of the previous term.
                    prev = stack.pop()
                    quotient = abs(prev) // num
                    stack.append(quotient if prev >= 0 else -quotient)
                op = ch
                num = 0
        return sum(stack)
