from typing import List, Optional


class Solution:
    def countBits(self, n: int) -> List[int]:
        ans = [0] * (n + 1)
        for i in range(1, n + 1):
            # value & (value - 1) clears the lowest set bit in one AND, so
            # the loop body runs exactly popcount(i) times — never once per
            # bit position.
            count = 0
            value = i
            while value:
                value &= value - 1
                count += 1
            ans[i] = count
        return ans
