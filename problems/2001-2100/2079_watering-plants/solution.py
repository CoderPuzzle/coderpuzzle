from typing import List, Optional


class Solution:
    def wateringPlants(self, plants: List[int], capacity: int) -> int:
        steps = len(plants)
        remaining = capacity
        for index, need in enumerate(plants):
            if remaining < need:
                steps += 2 * index
                remaining = capacity
            remaining -= need
        return steps
