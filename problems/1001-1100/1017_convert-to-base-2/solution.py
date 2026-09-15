class Solution:
    def baseNeg2(self, n: int) -> str:
        # Pull off one digit at a time: the least-significant digit is n
        # reduced modulo 2 (forced into {0, 1} even if the native operator
        # ever reported a negative remainder), and what's left is divided
        # by -2 to expose the next digit. n = 0 is handled directly since
        # the loop body never runs for it.
        if n == 0:
            return "0"
        digits = []
        while n != 0:
            remainder = n % 2
            if remainder < 0:
                remainder += 2
            digits.append(str(remainder))
            n = (n - remainder) // -2
        return "".join(reversed(digits))
