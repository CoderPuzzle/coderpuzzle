class Solution:
    def checkDivisibility(self, n: int) -> bool:
        # One divmod pass peels digits: the divisor is digit sum plus
        # digit product, and a zero digit safely zeroes only the product.
        total, product = 0, 1
        rest = n
        while rest > 0:
            rest, digit = divmod(rest, 10)
            total += digit
            product *= digit
        # Digit sum >= 1 always, so the divisor never hits zero.
        return n % (total + product) == 0
