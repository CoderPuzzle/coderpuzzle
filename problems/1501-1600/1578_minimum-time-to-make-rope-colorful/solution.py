from typing import List, Optional


class Solution:
    def minCost(self, colors: str, neededTime: List[int]) -> int:
        total = 0
        run_sum = neededTime[0]
        run_max = neededTime[0]
        for i in range(1, len(colors)):
            if colors[i] == colors[i - 1]:
                run_sum += neededTime[i]
                run_max = max(run_max, neededTime[i])
            else:
                total += run_sum - run_max
                run_sum = neededTime[i]
                run_max = neededTime[i]
        total += run_sum - run_max
        return total
