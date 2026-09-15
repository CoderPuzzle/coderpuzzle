from typing import List


class Solution:
    def chalkReplacer(self, chalk: List[int], k: int) -> int:
        # Whole rounds consume sum(chalk); simulate only the remainder.
        k %= sum(chalk)
        for i, c in enumerate(chalk):
            if k < c:
                return i
            k -= c
        return -1  # unreachable: remainder < sum
