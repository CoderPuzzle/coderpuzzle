class Solution:
    def countEven(self, num: int) -> int:
        # num <= 1000, so checking every value's digit sum directly is the
        # whole story.
        count = 0
        for value in range(1, num + 1):
            digit_sum = 0
            while value:
                digit_sum += value % 10
                value //= 10
            if digit_sum % 2 == 0:
                count += 1
        return count
