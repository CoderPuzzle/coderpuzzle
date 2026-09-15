from typing import List


class Solution:
    def countPairs(self, coordinates: List[List[int]], k: int) -> int:
        seen = {}
        total = 0
        for x, y in coordinates:
            point = (x << 20) | y
            for split in range(k + 1):
                partner = point ^ ((split << 20) | (k - split))
                total += seen.get(partner, 0)
            seen[point] = seen.get(point, 0) + 1
        return total
