from typing import List


class Solution:
    def minimumLines(self, stockPrices: List[List[int]]) -> int:
        stockPrices.sort()
        n = len(stockPrices)
        if n <= 2:
            return n - 1
        lines = 1
        for i in range(2, n):
            x1, y1 = stockPrices[i - 2]
            x2, y2 = stockPrices[i - 1]
            x3, y3 = stockPrices[i]
            if (x2 - x1) * (y3 - y2) != (x3 - x2) * (y2 - y1):
                lines += 1
        return lines
