class Solution:
    """Peel digits from the right: n % 10 is the last digit, n // 10
    discards it. Product and sum absorb each digit as it comes off."""

    def subtractProductAndSum(self, n: int) -> int:
        product = 1
        total = 0
        while n > 0:
            digit = n % 10
            product *= digit
            total += digit
            n //= 10
        return product - total
