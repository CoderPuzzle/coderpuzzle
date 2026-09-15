class Solution:
    def nextPalindrome(self, num: str) -> str:
        # A palindrome is fully determined by its first half (the middle
        # digit of an odd-length palindrome is fixed by the multiset).
        # The smallest larger palindrome rearranging the same digits is
        # the next permutation of the first floor(n/2) digits, mirrored.
        n = len(num)
        if n == 1:
            return ""
        half = list(num[: n // 2])
        # classic next-permutation on the half
        i = len(half) - 2
        while i >= 0 and half[i] >= half[i + 1]:
            i -= 1
        if i < 0:
            return ""
        j = len(half) - 1
        while half[j] <= half[i]:
            j -= 1
        half[i], half[j] = half[j], half[i]
        half[i + 1 :] = reversed(half[i + 1 :])
        h = "".join(half)
        if n % 2 == 0:
            return h + h[::-1]
        return h + num[n // 2] + h[::-1]
