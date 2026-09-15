from typing import List, Optional


class Solution:
    def jobScheduling(self, startTime: List[int], endTime: List[int], profit: List[int]) -> int:
        from bisect import bisect_right

        # Weighted interval scheduling: pack as (end, start, profit) so jobs
        # come out in end-time order and best[i] is final before it is read.
        jobs = sorted(zip(endTime, startTime, profit))
        ends = [job[0] for job in jobs]
        n = len(jobs)
        # best[i] = max profit using only the first i jobs; best[0] = 0 anchors it.
        best = [0] * (n + 1)
        for i in range(1, n + 1):
            end, start, p = jobs[i - 1]
            # bisect_right => a job starting exactly when another ends does not
            # overlap; restricting to the first i-1 entries keeps predecessors
            # inside the processed prefix.
            j = bisect_right(ends, start, 0, i - 1)
            # Skip job i (inherit best[i-1]) or take it on top of best[j].
            best[i] = max(best[i - 1], best[j] + p)
        return best[n]
