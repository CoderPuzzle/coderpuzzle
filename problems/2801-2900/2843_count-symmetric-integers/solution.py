class Solution:
    def countSymmetricIntegers(self, low: int, high: int) -> int:
        # The digit count of every value in range is at most 5, so testing
        # each number directly is the whole problem: an even-length decimal
        # string is symmetric exactly when its two halves have equal digit
        # sums; odd-length numbers are never symmetric.
        count = 0
        for value in range(low, high + 1):
            digits = str(value)
            n = len(digits)
            half = n // 2
            if n % 2 == 0 and sum(map(int, digits[:half])) == sum(map(int, digits[half:])):
                count += 1
        return count
