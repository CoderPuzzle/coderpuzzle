from typing import List


class Solution:
    def maxCount(self, banned: List[int], n: int, maxSum: int) -> int:
        # Greedy ascending: swapping any chosen integer for a smaller
        # unchosen legal one only frees slack, so the cheapest remaining
        # legal value is always safe to take. Filter bans to the range
        # first, then walk 1..n while the running sum fits — the first
        # overflow ends the walk since everything after is larger.
        # The running sum never exceeds maxSum <= 10^9, inside int range.
        bad = {x for x in banned if x <= n}
        count = 0
        total = 0
        for v in range(1, n + 1):
            if v in bad:
                continue
            if total + v > maxSum:
                break
            total += v
            count += 1
        return count
