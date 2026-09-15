class Solution:
    def nextBeautifulNumber(self, n: int) -> int:
        candidate = n + 1
        while True:
            counts = [0] * 10
            value = candidate
            balanced = True
            while value > 0:
                digit = value % 10
                if digit == 0:
                    balanced = False
                    break
                counts[digit] += 1
                value //= 10

            if balanced:
                for digit in range(1, 10):
                    if counts[digit] != 0 and counts[digit] != digit:
                        balanced = False
                        break
            if balanced:
                return candidate
            candidate += 1
