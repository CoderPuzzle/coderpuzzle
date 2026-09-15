from typing import List


class Solution:
    def stringCount(self, n: int) -> int:
        # A good string needs at least one 'l', one 't' and two 'e's.
        # Inclusion-exclusion over the three deficits (missing l, missing
        # t, at-most-one e): 26^n minus strings avoiding each requirement,
        # re-adding intersections. A string with no 'l' has 25 choices per
        # slot; one with at most a single 'e' is 25^n plus n * 25^(n-1)
        # (place the lone 'e' first). pow handles the modular powers.
        mod = 10**9 + 7
        return (
            pow(26, n, mod)
            - 3 * pow(25, n, mod)
            - n % mod * pow(25, n - 1, mod)
            + 3 * pow(24, n, mod)
            + 2 * (n % mod) * pow(24, n - 1, mod)
            - pow(23, n, mod)
            - n % mod * pow(23, n - 1, mod)
        ) % mod
