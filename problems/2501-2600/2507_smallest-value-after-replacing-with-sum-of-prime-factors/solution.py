class Solution:
    def smallestValue(self, n: int) -> int:
        # Replace while the factor sum actually shrinks n: composites other
        # than 4 strictly decrease (a*b >= a+b with equality only at 2*2),
        # primes and 4 are fixed points, so the first non-shrinking value is
        # the smallest n ever takes.
        while True:
            total = 0
            remaining = n
            divisor = 2
            while divisor * divisor <= remaining:
                while remaining % divisor == 0:
                    total += divisor
                    remaining //= divisor
                divisor += 1
            if remaining > 1:
                total += remaining
            if total >= n:
                return n
            n = total
