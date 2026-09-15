from typing import List


class Solution:
    def maximumWealth(self, accounts: List[List[int]]) -> int:
        # Wealth is a per-row quantity: each customer's wealth is the sum
        # of their row, and the answer is the largest of those sums. Every
        # balance is at least 1, so a running maximum seeded at 0 is
        # always overwritten by the first row.
        richest = 0
        for row in accounts:
            richest = max(richest, sum(row))
        return richest
