class Solution:
    def isDigitorialPermutation(self, n: int) -> bool:
        # The factorial digit sum ignores digit order, so every
        # permutation of n shares one sum s. A digitorial permutation p
        # of n must equal its own factorial digit sum, which is also s,
        # so p = s and p reuses exactly n's digits. Conversely, when s
        # uses exactly n's digits, s itself is a leading-zero-free
        # arrangement of them (s >= 1) and equals its own factorial
        # digit sum. Hence the answer is a sorted-digit comparison.
        fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880]
        digits = str(n)
        s = sum(fact[int(c)] for c in digits)
        return sorted(digits) == sorted(str(s))
