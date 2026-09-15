from typing import List, Optional


class Solution:
    def canConvertString(self, s: str, t: str, k: int) -> bool:
        # equal length is guaranteed by the constraints
        if len(s) != len(t):
            return False
        # count how many positions need each shift amount d in 1..25
        need_count = [0] * 26
        for a, b in zip(s, t):
            d = (ord(b) - ord(a)) % 26
            if d != 0:
                need_count[d] += 1
        # the j-th position needing shift d must use move d + 26*(j-1)
        for d in range(1, 26):
            count = need_count[d]
            if count == 0:
                continue
            last_move = d + 26 * (count - 1)
            if last_move > k:
                return False
        return True
