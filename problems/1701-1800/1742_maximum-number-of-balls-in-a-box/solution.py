from typing import List, Optional


class Solution:
    def countBalls(self, lowLimit: int, highLimit: int) -> int:
        # Ball x is filed into box digit_sum(x), and with highLimit <= 10^5
        # no digit sum exceeds 45 (99999 -> 45), so a 46-slot counter
        # indexed by digit sum covers every box the range can reach.
        # Sweep once, strip digits with % 10 and // 10, bump the named
        # slot, and answer with the fullest slot.
        counts = [0] * 46
        for x in range(lowLimit, highLimit + 1):
            s = 0
            while x:
                s += x % 10
                x //= 10
            counts[s] += 1
        return max(counts)
