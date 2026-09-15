class Solution:
    def divisorSubstrings(self, num: int, k: int) -> int:
        # Slide a length-k window over the digit string, keeping the window's
        # integer value incrementally: drop the leading digit, shift, add the
        # new trailing digit. Leading zeros are fine because the value is what
        # matters, and a zero window never divides num.
        digits = str(num)
        power = 10 ** (k - 1)
        window = int(digits[:k])
        count = 0
        if window != 0 and num % window == 0:
            count += 1
        for i in range(k, len(digits)):
            window = (window % power) * 10 + int(digits[i])
            if window != 0 and num % window == 0:
                count += 1
        return count
