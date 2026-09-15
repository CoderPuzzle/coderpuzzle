import heapq
from typing import List


class Solution:
    def maxSpending(self, values: List[List[int]]) -> int:
        # Each row is non-increasing, so a shop's cheapest unbought item
        # always sits at the moving tail. Buying the globally cheapest
        # tail on each (cheapest-first) day pairs every value with the
        # smallest day it can still take, which an exchange argument
        # shows is optimal: swapping any two days' purchases never pays.
        heap = [(row[-1], index, len(row) - 1) for index, row in enumerate(values)]
        heapq.heapify(heap)
        total = 0
        days = len(values) * len(values[0])
        for day in range(1, days + 1):
            value, index, position = heapq.heappop(heap)
            total += value * day
            if position > 0:
                heapq.heappush(heap, (values[index][position - 1], index, position - 1))
        return total
