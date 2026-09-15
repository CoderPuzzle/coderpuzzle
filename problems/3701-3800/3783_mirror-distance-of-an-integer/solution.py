class Solution:
    def mirrorDistance(self, n: int) -> int:
        # Peel digits least-significant first to build the reversal; any
        # trailing zeros of n simply never materialize as leading zeros.
        original, reversed_n = n, 0
        while n > 0:
            reversed_n = reversed_n * 10 + n % 10
            n //= 10
        return abs(original - reversed_n)
