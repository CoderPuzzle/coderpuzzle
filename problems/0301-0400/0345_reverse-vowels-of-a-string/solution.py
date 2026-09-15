class Solution:
    def reverseVowels(self, s: str) -> str:
        # Python strings are immutable, so the scan runs on a char list — the
        # honest equivalent of the in-place algorithm.
        vowels = set("aeiouAEIOU")
        chars = list(s)
        lo, hi = 0, len(chars) - 1
        while lo < hi:
            # Advance whichever side does not sit on a vowel.
            if chars[lo] not in vowels:
                lo += 1
            elif chars[hi] not in vowels:
                hi -= 1
            else:
                # Both ends hold a vowel: swap them and step both inward.
                chars[lo], chars[hi] = chars[hi], chars[lo]
                lo += 1
                hi -= 1
        return "".join(chars)
