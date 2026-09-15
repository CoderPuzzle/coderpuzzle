class Solution:
    def numberCount(self, a: int, b: int) -> int:
        def has_unique_digits(value: int) -> bool:
            seen = 0
            while value > 0:
                bit = 1 << (value % 10)
                if seen & bit:
                    return False
                seen |= bit
                value //= 10
            return True

        return sum(1 for value in range(a, b + 1) if has_unique_digits(value))
