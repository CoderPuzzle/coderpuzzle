class Solution:
    def alternateDigitSum(self, n: int) -> int:
        # Peel digits from the low end, alternating signs as we go: this
        # yields the right magnitudes but anchors "+" at the LEAST
        # significant digit. The most significant digit must carry "+",
        # so when the digit count is even the accumulated total has its
        # sign inverted once at the end.
        total = 0
        sign = 1
        count = 0
        rest = n
        while rest > 0:
            total += sign * (rest % 10)
            sign = -sign
            rest //= 10
            count += 1
        return -total if count % 2 == 0 else total
