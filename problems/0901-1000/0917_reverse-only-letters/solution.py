class Solution:
    def reverseOnlyLetters(self, s: str) -> str:
        # Python strings are immutable, so the scan runs on a char list — the
        # honest equivalent of the in-place algorithm.
        def is_letter(c):
            return "a" <= c <= "z" or "A" <= c <= "Z"

        chars = list(s)
        lo, hi = 0, len(chars) - 1
        while lo < hi:
            # Advance whichever side does not sit on a letter.
            if not is_letter(chars[lo]):
                lo += 1
            elif not is_letter(chars[hi]):
                hi -= 1
            else:
                # Both ends hold a letter: swap them and step both inward.
                chars[lo], chars[hi] = chars[hi], chars[lo]
                lo += 1
                hi -= 1
        return "".join(chars)
