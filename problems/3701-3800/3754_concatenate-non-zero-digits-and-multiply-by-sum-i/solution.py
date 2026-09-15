class Solution:
    def sumAndMultiply(self, n: int) -> int:
        # One pass peels n's digits least-significant first: each nonzero
        # digit joins the packed value x at the place slot it earns and
        # joins the digit sum; zeros fall through untouched, so x ends up
        # holding the surviving digits in their original order.
        x = 0
        place = 1
        total = 0
        while n > 0:
            digit = n % 10
            if digit != 0:
                x += digit * place
                place *= 10
                total += digit
            n //= 10
        return x * total
