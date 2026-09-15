from math import isqrt


class Solution:
    def largestPalindrome(self, n: int) -> int:
        # Every 2-digit palindrome is a multiple of 11, which no product of
        # two 1-digit factors can be, so the answer is the palindrome 9 = 3 * 3.
        if n == 1:
            return 9
        hi = 10**n - 1
        lo = 10 ** (n - 1)
        # A 2n-digit palindrome is fixed by its first half: enumerate halves
        # downward, so the first candidate that factors is the largest.
        for half in range(hi, lo - 1, -1):
            text = str(half)
            palindrome = int(text + text[::-1])
            # The larger factor of any pair lies between hi and the integer
            # square root; the cofactor check rejects pairs like
            # (10^n - 1) * (10^n + 1), whose cofactor runs a digit long.
            for factor in range(hi, isqrt(palindrome) - 1, -1):
                if palindrome % factor == 0:
                    other = palindrome // factor
                    if lo <= other <= hi:
                        return palindrome % 1337
        # Every width from 2 up has a palindromic product; this is only the
        # exit the type checker needs.
        return 0
