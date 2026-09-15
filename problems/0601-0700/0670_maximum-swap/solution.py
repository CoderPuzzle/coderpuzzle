class Solution:
    def maximumSwap(self, num: int) -> int:
        # One swap can raise exactly one position, and a position is worth
        # more the further left it sits, so the best swap moves the largest
        # available digit as far left as it can go. Record the last index of
        # each digit value, then scan left to right: at the first position
        # where a larger digit occurs later, swap in the largest such digit,
        # taken from its LAST occurrence — the tiebreak pushes the displaced
        # smaller digit as far right as it can go. No qualifying position
        # means num is already maximal and is returned unchanged.
        digits = list(str(num))
        last = {int(d): i for i, d in enumerate(digits)}
        for i, d in enumerate(digits):
            for value in range(9, int(d), -1):
                if last.get(value, -1) > i:
                    digits[i], digits[last[value]] = digits[last[value]], digits[i]
                    return int("".join(digits))
        return num
