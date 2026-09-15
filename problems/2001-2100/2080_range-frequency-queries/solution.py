from bisect import bisect_left, bisect_right
from collections import defaultdict
from typing import DefaultDict, List


class RangeFreqQuery:
    def __init__(self, arr: List[int]) -> None:
        self.positions: DefaultDict[int, List[int]] = defaultdict(list)
        for index, value in enumerate(arr):
            self.positions[value].append(index)

    def query(self, left: int, right: int, value: int) -> int:
        indices = self.positions[value]
        return bisect_right(indices, right) - bisect_left(indices, left)
