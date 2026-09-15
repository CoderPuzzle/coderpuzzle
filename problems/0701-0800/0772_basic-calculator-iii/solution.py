import sys


class Solution:
    def calculate(self, s: str) -> int:
        sys.setrecursionlimit(100000)
        n = len(s)
        i = 0

        def expr() -> int:
            nonlocal i
            value = term()
            while i < n and s[i] in "+-":
                op = s[i]
                i += 1
                rhs = term()
                value = value + rhs if op == "+" else value - rhs
            return value

        def term() -> int:
            nonlocal i
            value = factor()
            while i < n and s[i] in "*/":
                op = s[i]
                i += 1
                rhs = factor()
                if op == "*":
                    value *= rhs
                else:
                    quotient = abs(value) // abs(rhs)
                    value = quotient if (value < 0) == (rhs < 0) else -quotient
            return value

        def factor() -> int:
            nonlocal i
            if s[i] == "(":
                i += 1
                value = expr()
                i += 1  # closing ")"
                return value
            start = i
            while i < n and s[i].isdigit():
                i += 1
            return int(s[start:i])

        return expr()
