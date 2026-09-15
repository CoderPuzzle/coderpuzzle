from typing import List


class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        # Stack machine: operands wait on the stack until an operator arrives,
        # pops its two operands -- the second pop is the left one -- and pushes
        # the result of applying itself.
        stack: List[int] = []
        for token in tokens:
            if token in {"+", "-", "*", "/"}:
                b = stack.pop()
                a = stack.pop()
                if token == "+":
                    stack.append(a + b)
                elif token == "-":
                    stack.append(a - b)
                elif token == "*":
                    stack.append(a * b)
                else:
                    # Division truncates toward zero. Python's // floors, so
                    # floor the absolute values and reapply the sign instead.
                    quotient = abs(a) // abs(b)
                    stack.append(-quotient if (a < 0) != (b < 0) else quotient)
            else:
                stack.append(int(token))
        return stack[0]
