class Solution:
    def hasSameDigits(self, s: str) -> bool:
        # Each operation is a local rule: replace every adjacent pair with
        # its sum mod 10, shrinking the digit list by one. With at most 100
        # digits the whole reduction is at most ~5000 additions, so simulate
        # it directly and compare the two survivors.
        digits = [ord(c) - 48 for c in s]
        while len(digits) > 2:
            digits = [(a + b) % 10 for a, b in zip(digits, digits[1:])]
        return digits[0] == digits[1]
