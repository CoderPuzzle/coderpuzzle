class Solution:
    def toHex(self, num: int) -> str:
        # Zero never enters the nibble loop, so it gets its own answer here.
        if num == 0:
            return "0"
        # Masking to 32 bits applies two's complement arithmetically: a
        # negative num becomes the unsigned bit pattern to read digits from.
        value = num & 0xFFFFFFFF
        alphabet = "0123456789abcdef"
        digits = []
        while value:
            # Take the low nibble, then shift the rest down by one digit.
            digits.append(alphabet[value & 0xF])
            value >>= 4
        # Nibbles come out lowest-first, so reverse for the answer.
        return "".join(reversed(digits))
