from typing import List


class Solution:
    def mergeSimilarItems(self, items1: List[List[int]], items2: List[List[int]]) -> List[List[int]]:
        # Accumulate weights per value in one map fed by both lists, then
        # emit the entries in ascending value order.
        weights: dict[int, int] = {}
        for value, weight in items1 + items2:
            weights[value] = weights.get(value, 0) + weight
        return [[value, weights[value]] for value in sorted(weights)]
