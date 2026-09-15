from typing import List


class Solution:
    def goodDaysToRobBank(self, security: List[int], time: int) -> List[int]:
        n = len(security)
        before = [0] * n
        after = [0] * n
        for day in range(1, n):
            if security[day - 1] >= security[day]:
                before[day] = before[day - 1] + 1
        for day in range(n - 2, -1, -1):
            if security[day] <= security[day + 1]:
                after[day] = after[day + 1] + 1
        return [day for day in range(n) if before[day] >= time and after[day] >= time]
