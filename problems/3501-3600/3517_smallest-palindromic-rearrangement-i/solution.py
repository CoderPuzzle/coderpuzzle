class Solution:
    def smallestPalindrome(self, s: str) -> str:
        # A palindrome is (half) + (odd char, at most one) + reverse(half),
        # and the half's multiset is forced: exactly count[c] // 2 of each
        # letter. So the smallest palindrome is the sorted half, mirrored.
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - 97] += 1
        half = []
        middle = ""
        for i, c in enumerate(counts):
            half.append(chr(97 + i) * (c // 2))
            if c % 2:
                middle = chr(97 + i)
        return "".join(half) + middle + "".join(reversed(half))
