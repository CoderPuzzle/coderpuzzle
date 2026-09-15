class Solution:
    def getSmallestString(self, s: str) -> str:
        # Python strings are immutable, so the scan runs on a char list — the
        # honest equivalent of the in-place algorithm.
        chars = list(s)
        for i in range(len(chars) - 1):
            # The first adjacent same-parity descent is the only swap worth
            # making: it lowers an earlier position than any later legal
            # swap could.
            if chars[i] > chars[i + 1] and int(chars[i]) % 2 == int(chars[i + 1]) % 2:
                # At most one swap is allowed, so stop right after it.
                chars[i], chars[i + 1] = chars[i + 1], chars[i]
                break
        return "".join(chars)
