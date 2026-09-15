class Solution:
    def validDigit(self, n: int, x: int) -> bool:
        digits = str(n)
        target = str(x)
        return target in digits and digits[0] != target
