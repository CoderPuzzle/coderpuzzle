from typing import List


class Solution:
    def maxSatisfied(self, customers: List[int], grumpy: List[int], minutes: int) -> int:
        base = sum(c for c, g in zip(customers, grumpy) if g == 0)

        window = sum(customers[i] for i in range(minutes) if grumpy[i] == 1)
        best = window
        for i in range(minutes, len(customers)):
            if grumpy[i] == 1:
                window += customers[i]
            if grumpy[i - minutes] == 1:
                window -= customers[i - minutes]
            best = max(best, window)

        return base + best
