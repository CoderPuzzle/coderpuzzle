class Solution:
    def countDigits(self, num: int) -> int:
        # Peel digits off the low end with % 10 / // 10 and test each one
        # against the untouched original. The input guarantees no zero
        # digit, so every divisor test is safe.
        count = 0
        rest = num
        while rest > 0:
            if num % (rest % 10) == 0:
                count += 1
            rest //= 10
        return count
