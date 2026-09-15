class Solution:
    def closestFair(self, n: int) -> int:
        # A fair integer needs an even digit count with half of the digits
        # odd. When the digit count is odd no fair integer exists with that
        # many digits, so the answer is the smallest fair number with one
        # more digit: a leading 1, then half zeros and half-1 ones (balanced
        # by construction and minimal).
        def is_fair(x: int) -> bool:
            odd = 0
            length = 0
            while x:
                if x & 1:
                    odd += 1
                length += 1
                x //= 10
            return length % 2 == 0 and odd * 2 == length

        digits = len(str(n))
        if digits % 2 == 1:
            half = (digits + 1) // 2
            return int("1" + "0" * half + "1" * (half - 1))
        # Even digit count: the next fair integer is close, so scan upward.
        for k in range(n, 10**digits):
            if is_fair(k):
                return k
        half = (digits + 2) // 2
        return int("1" + "0" * half + "1" * (half - 1))
