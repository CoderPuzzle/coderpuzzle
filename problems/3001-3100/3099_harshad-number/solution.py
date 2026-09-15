class Solution:
    def sumOfTheDigitsOfHarshadNumber(self, x: int) -> int:
        # Extract digits by repeated division (hint 1), then the definition
        # itself finishes the job: x is a Harshad number exactly when its
        # digit sum divides it. With x <= 100 there are at most three digits
        # and every intermediate stays far below any 32-bit limit.
        total = 0
        remaining = x
        while remaining > 0:
            total += remaining % 10
            remaining //= 10
        return total if x % total == 0 else -1
