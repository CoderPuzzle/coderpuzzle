from typing import List


class Solution:
    def earliestFinishTime(
        self,
        landStartTime: List[int],
        landDuration: List[int],
        waterStartTime: List[int],
        waterDuration: List[int],
    ) -> int:
        # Only the moment the first ride ends matters: the second ride then
        # costs max(open, finish) + duration, which never improves when the
        # hand-off gets later. So each order fixes the earliest-finishing
        # ride of the first category and scans the other category.
        land_finish = min(s + d for s, d in zip(landStartTime, landDuration))
        water_finish = min(s + d for s, d in zip(waterStartTime, waterDuration))
        land_first = min(max(s, land_finish) + d for s, d in zip(waterStartTime, waterDuration))
        water_first = min(max(s, water_finish) + d for s, d in zip(landStartTime, landDuration))
        return min(land_first, water_first)
