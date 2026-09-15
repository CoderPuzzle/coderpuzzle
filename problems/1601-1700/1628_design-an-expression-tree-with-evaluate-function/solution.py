from typing import List, Optional


class Solution:
    def buildAndEvaluate(self, postfix: List[str]) -> int:
        stack: List[int] = []
        for tok in postfix:
            if tok in ("+", "-", "*", "/"):
                b = stack.pop()
                a = stack.pop()
                if tok == "+":
                    stack.append(a + b)
                elif tok == "-":
                    stack.append(a - b)
                elif tok == "*":
                    stack.append(a * b)
                else:
                    quotient = abs(a) // abs(b)
                    stack.append(-quotient if (a < 0) != (b < 0) else quotient)
            else:
                stack.append(int(tok))
        return stack[-1]
