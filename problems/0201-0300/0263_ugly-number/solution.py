class Solution:
    def isUgly(self, n: int) -> bool:
        # Ugly means positive with no prime factor beyond 2, 3, and 5, so
        # divide those three out to exhaustion; unique factorization makes
        # the order irrelevant. The residue is 1 exactly when nothing else
        # was ever present, and n <= 0 fails "positive" on the spot.
        if n <= 0:
            return False
        for factor in (2, 3, 5):
            while n % factor == 0:
                n //= factor
        return n == 1
