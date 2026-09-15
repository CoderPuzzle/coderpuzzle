from typing import List, Optional


class Solution:
    def getSmallestString(self, n: int, k: int) -> str:
        # Fill from the end. At a position with i open slots before it,
        # reserve one unit per open slot and spend everything else here,
        # capped at z. The first time the cap stops binding, the reserve
        # drops to exactly the open count and every earlier slot is 'a'.
        chars = [""] * n
        remaining = k
        for i in range(n - 1, -1, -1):
            value = min(26, remaining - i)
            chars[i] = chr(ord("a") + value - 1)
            remaining -= value
        return "".join(chars)
