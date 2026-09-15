from typing import List


class Solution:
    def canBeEqual(self, target: List[int], arr: List[int]) -> bool:
        counts = [0] * 1001
        for value in target:
            counts[value] += 1
        for value in arr:
            counts[value] -= 1
        return all(count == 0 for count in counts)
