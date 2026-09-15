class Solution:
    def fractionToDecimal(self, numerator: int, denominator: int) -> str:
        # Long division on the magnitudes: each remainder maps to the position
        # of the digit it produced, so the first remainder seen twice opens
        # the recurring parentheses at its recorded position.
        # Python integers are unbounded, so abs(-2^31) needs no widening here.
        negative = (numerator < 0) != (denominator < 0)
        n, d = abs(numerator), abs(denominator)
        whole, n = divmod(n, d)
        seen = {}
        digits = []
        while n and n not in seen:
            seen[n] = len(digits)
            digit, n = divmod(n * 10, d)
            digits.append(str(digit))
        fraction = "".join(digits)
        if n:  # A repeated remainder: every digit from its first occurrence recurs.
            start = seen[n]
            fraction = fraction[:start] + "(" + fraction[start:] + ")"
        # "-" is prepended once, and never on a zero result (0 over a negative
        # denominator must not become "-0").
        result = str(whole) + ("." + fraction if digits else "")
        return "-" + result if negative and result != "0" else result
