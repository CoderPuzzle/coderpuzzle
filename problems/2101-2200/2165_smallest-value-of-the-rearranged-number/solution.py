class Solution:
    def smallestNumber(self, num: int) -> int:
        # The sign only picks the sort direction: a negative result is
        # smallest when its magnitude is largest (digits descending), a
        # positive one when the smallest nonzero digit leads and the
        # zeroes follow it instead of preceding it.
        if num == 0:
            return 0
        negative = num < 0
        digits = sorted(str(abs(num)), reverse=negative)
        if not negative:
            index = next(i for i, d in enumerate(digits) if d != "0")
            digits[0], digits[index] = digits[index], digits[0]
        value = int("".join(digits))
        return -value if negative else value
