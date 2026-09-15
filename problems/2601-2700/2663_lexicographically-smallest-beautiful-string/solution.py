from typing import List


class Solution:
    def smallestBeautifulString(self, s: str, k: int) -> str:
        # A string avoids every palindromic substring iff it avoids the short
        # ones: any longer palindrome contains a length-2 or length-3 one at
        # its center (hint 1). So a character is safe exactly when it differs
        # from both of the two characters before it — only those could build a
        # forbidden palindrome ending here.
        limit = ord("a") + k
        chars = list(s)
        placed = False
        pivot = -1
        # Walk right to left and bump the first position that accepts a larger
        # safe letter; leaving earlier positions untouched keeps the result
        # minimal, since any smaller answer must agree with s even further.
        for i in range(len(chars) - 1, -1, -1):
            for code in range(ord(s[i]) + 1, limit):
                cand = chr(code)
                if (i < 1 or chars[i - 1] != cand) and (i < 2 or chars[i - 2] != cand):
                    chars[i] = cand
                    placed = True
                    break
            if placed:
                pivot = i
                break
        if not placed:
            return ""
        # Rebuild everything after the pivot with the smallest safe letter,
        # which repeats as soon as blocking distance passes ("abcabc...").
        for j in range(pivot + 1, len(chars)):
            for code in range(ord("a"), limit):
                cand = chr(code)
                if (j < 1 or chars[j - 1] != cand) and (j < 2 or chars[j - 2] != cand):
                    chars[j] = cand
                    break
        return "".join(chars)
