class Solution:
    def smallestFactorization(self, num: int) -> int:
        # The digits of the answer multiply to num, and a number with fewer
        # digits is always smaller than one with more, so the smallest
        # answer uses the fewest digits whose product is num, arranged
        # ascending. Fewest digits is exactly what dividing by the largest
        # digits first finds: 9 packs two 3s into one digit, 8 packs three
        # 2s, and the sweep down to 2 ends with no two digits that could
        # merge into one (2*2 -> 4, 2*3 -> 6, 2*4 -> 8, 3*3 -> 9), so the
        # digit count is minimal — and grabbing the largest digits first
        # also wins the ties among equally short factorizations, four 2s
        # packing as 8*2 (28) rather than 4*4 (44). The divisions land the
        # digits in descending order, so folding them back to front
        # assembles the smallest arrangement.
        if num < 2:
            return num  # only num = 1 arrives — 1 is its own answer
        digits = []
        for d in range(9, 1, -1):
            while num % d == 0:
                num //= d
                digits.append(d)
        # A prime factor of 11 or more survives every digit division — no
        # product of digits can equal such a num (11, 13, 22, 720720), so
        # no answer exists.
        if num > 1:
            return 0
        result = 0
        for d in reversed(digits):
            result = result * 10 + d
        # num fitting the 32-bit input range says nothing about the answer
        # fitting: 5^13 = 1220703125 is in range yet factors only into
        # thirteen 5s (5555555555555). The folded value is checked against
        # the 32-bit ceiling before it is returned; Python's integers are
        # arbitrary-precision, so the assembly and the check are exact.
        return result if result <= 2147483647 else 0
