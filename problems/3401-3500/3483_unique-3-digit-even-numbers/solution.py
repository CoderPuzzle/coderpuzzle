from typing import List


class Solution:
    def totalNumbers(self, digits: List[int]) -> int:
        # Tally the digit supply once, then walk the 450 candidate numbers
        # (hundreds 1-9, tens 0-9, even units) and keep those whose digit
        # multiset fits the supply.
        counts = [0] * 10
        for d in digits:
            counts[d] += 1
        total = 0
        for h in range(1, 10):
            for t in range(10):
                for u in (0, 2, 4, 6, 8):
                    need = [0] * 10
                    need[h] += 1
                    need[t] += 1
                    need[u] += 1
                    if all(need[v] <= counts[v] for v in range(10)):
                        total += 1
        return total
