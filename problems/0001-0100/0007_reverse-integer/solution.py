class Solution:
    def reverse(self, x: int) -> int:
        # Reverse the magnitude and reattach the sign at the end: Python's
        # floor division would pop 7 from -123, and the sign never changes
        # which digits appear.
        sign = -1 if x < 0 else 1
        x = abs(x)
        int_max = 2**31 - 1
        rev = 0
        while x:
            pop = x % 10
            x //= 10
            # Clamp before the push, never after: the statement forbids
            # 64-bit slack, so rev * 10 + pop must provably stay in range.
            # int_max is 2147483647, so on the exact edge the last digit
            # may be at most 7.
            if rev > int_max // 10 or (rev == int_max // 10 and pop > 7):
                return 0
            rev = rev * 10 + pop
        return sign * rev
