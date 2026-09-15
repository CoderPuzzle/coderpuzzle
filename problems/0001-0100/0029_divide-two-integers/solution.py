class Solution:
    def divide(self, dividend: int, divisor: int) -> int:
        # The one quotient that does not fit in 32 bits: -2^31 divided by -1 is 2^31.
        # Clamped up front per the statement's rule.
        if dividend == -2147483648 and divisor == -1:
            return 2147483647
        # Magnitudes in, sign out: the quotient of the magnitudes with the
        # sign reapplied truncates toward zero by construction.
        negative = (dividend < 0) != (divisor < 0)
        a, b = abs(dividend), abs(divisor)
        quotient = 0
        while a >= b:
            # Find the largest chunk = b doubled (by addition) that still
            # fits in a; multiple doubles alongside it as the chunk's weight.
            chunk, multiple = b, 1
            while a >= chunk + chunk:
                chunk += chunk
                multiple += multiple
            a -= chunk
            quotient += multiple
        return -quotient if negative else quotient
