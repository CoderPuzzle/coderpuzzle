class Solution:
    def getLucky(self, s: str, k: int) -> int:
        # Convert letters to their 1..26 positions as a digit string, then
        # apply the digit-sum transform k times. The concatenated value
        # stays a string: 100 letters -> up to 200 digits, far beyond any
        # fixed-width integer.
        digits = "".join(str(ord(ch) - ord("a") + 1) for ch in s)
        for _ in range(k):
            digits = str(sum(int(d) for d in digits))
        return int(digits)
