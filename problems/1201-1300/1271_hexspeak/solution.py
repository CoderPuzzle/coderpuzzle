from string import ascii_uppercase


class Solution:
    def toHexspeak(self, num: str) -> str:
        # Peel hex digits by repeated divmod — no format strings, so the
        # digit alphabet stays explicit: 0->O, 1->I, 10..15 -> A..F, and
        # digits 2..9 make the representation invalid.
        digits = []
        n = int(num)
        while True:
            n, r = divmod(n, 16)
            digits.append(r)
            if n == 0:
                break
        letters = []
        for r in reversed(digits):
            if 2 <= r <= 9:
                return "ERROR"
            letters.append("OI"[r] if r < 2 else ascii_uppercase[r - 10])
        return "".join(letters)
