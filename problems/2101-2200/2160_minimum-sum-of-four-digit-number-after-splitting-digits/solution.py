class Solution:
    def minimumSum(self, num: int) -> int:
        # The sum of two numbers built from the four digits is minimized by
        # giving the two smallest digits the tens places, so sort and pair
        # smallest+largest into the two two-digit numbers.
        digits = sorted(int(d) for d in str(num))
        return 10 * (digits[0] + digits[1]) + digits[2] + digits[3]
