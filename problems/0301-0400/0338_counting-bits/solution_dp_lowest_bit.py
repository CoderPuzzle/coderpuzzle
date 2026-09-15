from typing import List, Optional


class Solution:
    def countBits(self, n: int) -> List[int]:
        ans = [0] * (n + 1)
        # i & (i - 1) clears i's lowest set bit, so its popcount is already
        # computed; the +1 adds the cleared bit back. Since i & (i-1) < i
        # for every i >= 1, ascending order keeps the needed value ready.
        for i in range(1, n + 1):
            ans[i] = ans[i & (i - 1)] + 1
        return ans
