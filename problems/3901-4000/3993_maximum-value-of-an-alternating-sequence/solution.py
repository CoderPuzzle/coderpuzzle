class Solution:
    def maximumValue(self, n: int, s: int, m: int) -> int:
        if n == 1:
            return s
        high_count = n // 2
        increase_first = s + m + (high_count - 1) * (m - 1)
        decrease_first = s + m - 1 + (high_count - 1) * (m - 1)
        return max(increase_first, decrease_first)
