class Solution:
    def generateKey(self, num1: int, num2: int, num3: int) -> int:
        # Digit i of the key is the minimum of the three numbers' ith digits,
        # counted from the left of their zero-padded four-digit forms; the
        # integer result drops any leading zeros by construction.
        key = 0
        for place in (1000, 100, 10, 1):
            key = key * 10 + min(num1 // place % 10, num2 // place % 10, num3 // place % 10)
        return key
