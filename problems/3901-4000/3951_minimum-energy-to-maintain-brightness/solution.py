from typing import List


class Solution:
    def minEnergy(self, n: int, brightness: int, intervals: List[List[int]]) -> int:
        bulbs = (brightness + 2) // 3
        merged = []
        for start, end in sorted(intervals):
            if merged and start <= merged[-1][1] + 1:
                merged[-1][1] = max(merged[-1][1], end)
            else:
                merged.append([start, end])
        active_time = sum(end - start + 1 for start, end in merged)
        return bulbs * active_time
