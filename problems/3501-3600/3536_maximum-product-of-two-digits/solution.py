class Solution:
    def maxProduct(self, n: int) -> int:
        # All digits are >= 0, so the best pair product is the product of
        # the two largest digits; sorting the (at most 10) digits and taking
        # the top two answers every case, repeated digits included.
        digits = sorted((int(d) for d in str(n)), reverse=True)
        return digits[0] * digits[1]
