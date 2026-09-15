class Solution:
    def smallestNumber(self, n: int, t: int) -> int:
        # Brute force: step up from n until the digit product divides by t.
        # Any run of 10 consecutive integers contains a multiple of 10,
        # whose digit product 0 is divisible by every t >= 1, so the loop
        # needs at most 10 steps.
        def digit_product(value: int) -> int:
            product = 1
            while value > 0:
                product *= value % 10
                value //= 10
            return product

        while digit_product(n) % t != 0:
            n += 1
        return n
