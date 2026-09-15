from typing import List


class Solution:
    def hardestWorker(self, n: int, logs: List[List[int]]) -> int:
        # The ith task runs from the previous leave time to logs[i][1] (task
        # 0 starts at 0). Keep the best (longest, then smallest id) running.
        best_id = -1
        best_time = -1
        prev = 0
        for emp, leave in logs:
            duration = leave - prev
            if duration > best_time or (duration == best_time and emp < best_id):
                best_time = duration
                best_id = emp
            prev = leave
        return best_id
