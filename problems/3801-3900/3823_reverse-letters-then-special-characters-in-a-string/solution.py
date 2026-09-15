from typing import List, Optional


class Solution:
    def reverseByType(self, s: str) -> str:
        # The two reversals act on disjoint position sets — a slot that
        # starts on a letter ends on a letter — so each class can be
        # reversed independently, in place. Each pass walks two pointers
        # inward from the ends, skipping characters outside the class
        # being reversed, and swaps when both sides are on the class.
        chars = list(s)
        n = len(chars)

        def is_letter(c):
            return "a" <= c <= "z"

        i, j = 0, n - 1
        while i < j:
            if not is_letter(chars[i]):
                i += 1
            elif not is_letter(chars[j]):
                j -= 1
            else:
                chars[i], chars[j] = chars[j], chars[i]
                i += 1
                j -= 1

        i, j = 0, n - 1
        while i < j:
            if is_letter(chars[i]):
                i += 1
            elif is_letter(chars[j]):
                j -= 1
            else:
                chars[i], chars[j] = chars[j], chars[i]
                i += 1
                j -= 1
        return "".join(chars)
