from typing import List


class SmallerNumbersThanCurrent:
    def __init__(self):
        pass

    def smallerNumbersThanCurrent(self, nums: List[int]) -> List[int]:
        counts = [0] * 101
        for v in nums:
            counts[v] += 1
        for v in range(1, 101):
            counts[v] += counts[v - 1]
        below = [0] * 101
        for v in range(1, 101):
            below[v] = counts[v - 1]
        return [below[v] for v in nums]
