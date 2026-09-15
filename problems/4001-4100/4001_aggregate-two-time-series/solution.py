from typing import List


class Solution:
    def aggregateTimeSeries(self, series1: List[List[int]], series2: List[List[int]]) -> List[List[int]]:
        i, j = len(series1) - 1, len(series2) - 1
        value1 = value2 = 0
        merged = []
        # Sweep the union of timestamps from right to left. Each running
        # value is the last value its series contributed, which for every
        # timestamp still ahead of the cursor is exactly that series' next
        # available value; a series not yet reached contributes 0, matching
        # "no timestamp at or after this one".
        while i >= 0 or j >= 0:
            if j < 0 or (i >= 0 and series1[i][0] >= series2[j][0]):
                ts, value1 = series1[i]
                i -= 1
                if j >= 0 and series2[j][0] == ts:
                    value2 = series2[j][1]
                    j -= 1
            else:
                ts, value2 = series2[j]
                j -= 1
            merged.append([ts, value1 + value2])
        merged.reverse()
        return merged
