class Solution:
    def countDistinct(self, n: int) -> int:
        # Count the zero-free integers in [1, n] directly from n's digits,
        # peeled off arithmetically. Every shorter length contributes a
        # full block of 9^k values; then a prefix matching n so far
        # branches to any smaller nonzero digit and completes freely. The
        # walk stops at n's first zero digit — nothing below can be
        # zero-free once the prefix carries one.
        digits = []
        m = n
        while m > 0:
            digits.append(m % 10)
            m //= 10
        total = 0
        pow9 = 1
        for _ in range(len(digits) - 1):
            pow9 *= 9
            total += pow9
        tight = True
        for d in reversed(digits):
            if d > 1:
                total += (d - 1) * pow9
            if d == 0:
                tight = False
                break
            pow9 //= 9
        if tight:
            total += 1
        return total
