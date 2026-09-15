from typing import List


class Solution:
    def numberOfArrays(self, differences: List[int], lower: int, upper: int) -> int:
        prefix = 0
        minimum = 0
        maximum = 0
        for difference in differences:
            prefix += difference
            minimum = min(minimum, prefix)
            maximum = max(maximum, prefix)
        return max(0, upper - lower - (maximum - minimum) + 1)
