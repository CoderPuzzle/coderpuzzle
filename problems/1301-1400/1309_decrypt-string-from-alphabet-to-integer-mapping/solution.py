class Solution:
    def freqAlphabets(self, s: str) -> str:
        # A '#' disambiguates backwards, so scan from the right: at each
        # position either a '#' sits two places ahead (three-char token) or
        # the digit stands alone as a single letter.
        out = []
        i = len(s) - 1
        while i >= 0:
            if s[i] == "#":
                value = int(s[i - 2 : i])
                i -= 3
            else:
                value = int(s[i])
                i -= 1
            out.append(chr(ord("a") + value - 1))
        return "".join(reversed(out))
