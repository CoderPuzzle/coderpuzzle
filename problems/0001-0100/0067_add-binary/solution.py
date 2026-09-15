class Solution:
    def addBinary(self, a: str, b: str) -> str:
        # Walk both strings from their right ends, adding the way
        # pencil-and-paper binary addition does: one digit from each input
        # plus the carry in, one result digit and a new carry out.
        i, j = len(a) - 1, len(b) - 1
        carry = 0
        digits = []
        # Running while either input has digits left or a carry is pending
        # absorbs both uneven lengths (the shorter input just stops
        # contributing, no padding) and the final carry ("11" + "1" =
        # "100") with no special cases after the loop.
        while i >= 0 or j >= 0 or carry:
            total = carry
            if i >= 0:
                total += ord(a[i]) - ord("0")
                i -= 1
            if j >= 0:
                total += ord(b[j]) - ord("0")
                j -= 1
            # total is at most 3 (1 + 1 + carry), so its low bit is the
            # result digit and the rest is the next carry. Only single
            # characters are ever converted, never the whole strings, which
            # is what the follow-up asks for.
            digits.append(chr(ord("0") + total % 2))
            carry = total // 2
        # Digits were produced least-significant first; one reverse at the
        # end beats prepending each digit to the front.
        return "".join(reversed(digits))
