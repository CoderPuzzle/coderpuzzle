class Solution:
    def primePalindrome(self, n: int) -> int:
        # A palindrome is fixed by its first half — mirroring the half
        # without repeating its last digit rebuilds it, and larger halves
        # give larger palindromes within a length. A palindrome with an
        # even number of digits has alternating digit sum 0, so it is
        # divisible by 11: 11 is the family's only prime, and above it
        # only odd lengths are scanned, each candidate >= n trial-divided
        # up to its square root. The [2, 2*10^8] answer guarantee keeps
        # the scan inside the 9-digit class.
        def is_prime(x: int) -> bool:
            if x < 2:
                return False
            if x % 2 == 0:
                return x == 2
            d = 3
            while d * d <= x:
                if x % d == 0:
                    return False
                d += 2
            return True

        if n <= 11:
            # every prime below 12 is already a palindrome
            x = max(n, 2)
            while not is_prime(x):
                x += 1
            return x
        lo = 10
        while True:
            for half in range(lo, lo * 10):
                x = half
                t = half // 10
                while t:
                    x = x * 10 + t % 10
                    t //= 10
                if x >= n and is_prime(x):
                    return x
            lo *= 10
