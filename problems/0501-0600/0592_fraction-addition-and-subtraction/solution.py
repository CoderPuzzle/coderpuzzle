from typing import List, Optional


class Solution:
    def fractionAddition(self, expression: str) -> str:
        # One left-to-right scan reads each fraction: an optional sign, the
        # numerator's digits, '/', the denominator's digits. Fold it into the
        # running num/den by cross-multiplication - num/den +/- v/w =
        # (num*w +/- v*den)/(den*w) - integers only, never floats.
        num, den = 0, 1
        i, n = 0, len(expression)
        while i < n:
            sign = 1
            if expression[i] in "+-":
                sign = -1 if expression[i] == "-" else 1
                i += 1
            value = 0
            while i < n and expression[i].isdigit():
                value = value * 10 + int(expression[i])
                i += 1
            i += 1  # the '/' between numerator and denominator
            divisor = 0
            while i < n and expression[i].isdigit():
                divisor = divisor * 10 + int(expression[i])
                i += 1
            num = num * divisor + sign * value * den
            den *= divisor
        # Reduce once at the end. gcd(0, den) is den, so a zero sum collapses
        # to 0/1 and an integer keeps its denominator 1; the sign stays on
        # the numerator because den, a product of positives, is positive.
        a, b = abs(num), den
        while b:
            a, b = b, a % b
        return f"{num // a}/{den // a}"
