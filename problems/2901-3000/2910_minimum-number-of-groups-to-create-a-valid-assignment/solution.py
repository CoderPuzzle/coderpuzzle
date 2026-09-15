from collections import Counter
from typing import List


class Solution:
    def minGroupsForValidAssignment(self, balls: List[int]) -> int:
        # Some box size s must make every box hold s or s + 1 balls, and the
        # value with the fewest copies bounds s by its frequency. For each
        # candidate s, pack each frequency f into f / (s + 1) boxes when it
        # divides evenly, one more box when the remainder can be absorbed by
        # shrinking that many full boxes, or fail; the cheapest feasible s
        # wins.
        freqs = list(Counter(balls).values())
        best = len(balls)
        for size in range(1, min(freqs) + 1):
            total, ok = 0, True
            for f in freqs:
                big, rest = divmod(f, size + 1)
                if rest != 0:
                    if size - rest > big:
                        ok = False
                        break
                    total += 1
                total += big
            if ok and total < best:
                best = total
        return best
