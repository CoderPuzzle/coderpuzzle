class Solution:
    def convertToBase7(self, num: int) -> str:
        # Zero never enters the digit loop, so it gets its own answer here.
        if num == 0:
            return "0"
        # Digits of the magnitude come out lowest-first; the sign is kept
        # aside and prepended at the end.
        negative = num < 0
        value = -num if negative else num
        digits = []
        while value:
            # Split off the low base-7 digit, then shift the rest down.
            value, digit = divmod(value, 7)
            digits.append(str(digit))
        # Digits come out lowest-first, so reverse for the answer.
        return ("-" if negative else "") + "".join(reversed(digits))
