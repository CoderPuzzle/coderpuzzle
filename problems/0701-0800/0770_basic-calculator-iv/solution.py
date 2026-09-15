from typing import List


class Solution:
    def basicCalculatorIV(self, expression: str, evalvars: List[str], evalints: List[int]) -> List[str]:
        # One scan, two stacks: a stack of polynomials — each a map from a
        # term (its variables, sorted, joined by '*'; "" is the constant
        # term) to its coefficient — and a stack of pending operators.
        # Every operand pushes a one-term polynomial; a variable listed in
        # evalvars (or a number) becomes the constant term. '+' and '-'
        # drain every pending operator down to '(', '*' drains only '*',
        # and ')' drains to its matching '(' — precedence and brackets in
        # four rules. Multiplying pairs every term of both sides, merging
        # the two variable lists into one sorted list; adding merges
        # coefficients of equal terms. Zero terms drop out at the end,
        # where terms print degree-descending first and lexicographic
        # within a degree, coefficient left of its variables.
        evalmap = dict(zip(evalvars, evalints))

        def apply(polys, ops):
            op = ops.pop()
            right = polys.pop()
            left = polys.pop()
            if op == "*":
                product = {}
                for lkey, lcoef in left.items():
                    lvars = lkey.split("*") if lkey else []
                    for rkey, rcoef in right.items():
                        merged = sorted(lvars + (rkey.split("*") if rkey else []))
                        key = "*".join(merged)
                        product[key] = product.get(key, 0) + lcoef * rcoef
                polys.append(product)
            else:
                sign = 1 if op == "+" else -1
                for key, coef in right.items():
                    left[key] = left.get(key, 0) + sign * coef
                polys.append(left)

        polys = []
        ops = []
        i, n = 0, len(expression)
        while i < n:
            ch = expression[i]
            if ch == " ":
                i += 1
            elif ch == "(":
                ops.append(ch)
                i += 1
            elif ch == ")":
                while ops[-1] != "(":
                    apply(polys, ops)
                ops.pop()
                i += 1
            elif ch in "+-*":
                while ops and (ops[-1] == "*" if ch == "*" else ops[-1] != "("):
                    apply(polys, ops)
                ops.append(ch)
                i += 1
            else:
                j = i
                while j < n and expression[j].isalnum():
                    j += 1
                token = expression[i:j]
                if token[0].isdigit():
                    polys.append({"": int(token)})
                elif token in evalmap:
                    polys.append({"": evalmap[token]})
                else:
                    polys.append({token: 1})
                i = j
        while ops:
            apply(polys, ops)

        result = polys[0]
        terms = sorted(
            ((key, coef) for key, coef in result.items() if coef),
            key=lambda item: (-(item[0].count("*") + 1 if item[0] else 0), item[0]),
        )
        return [str(coef) if not key else f"{coef}*{key}" for key, coef in terms]
