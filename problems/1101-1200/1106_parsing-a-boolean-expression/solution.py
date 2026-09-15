from typing import List, Optional


class Solution:
    def parseBoolExpr(self, expression: str) -> bool:
        def parse(expr: str, index: int):
            ch = expr[index]
            if ch == "t":
                return True, index + 1
            if ch == "f":
                return False, index + 1
            op = ch
            index += 2  # skip the operator and '('
            values = []
            while True:
                value, index = parse(expr, index)
                values.append(value)
                if expr[index] == ",":
                    index += 1
                else:  # ')'
                    index += 1
                    break
            if op == "!":
                return not values[0], index
            if op == "&":
                return all(values), index
            return any(values), index

        return parse(expression, 0)[0]
