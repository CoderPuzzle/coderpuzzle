from typing import List


class Solution:
    def countServers(self, n: int, logs: List[List[int]], x: int, queries: List[int]) -> List[int]:
        # In the time-sorted logs each query's hits form a contiguous run
        # (times in [q - x, q]). Answering queries in increasing order lets
        # one window serve them all; sorting indices keeps answers in place.
        logs.sort(key=lambda log: log[1])
        order = sorted(range(len(queries)), key=lambda i: queries[i])
        cnt = [0] * (n + 1)
        arr = [0] * len(queries)
        distinct = 0
        lo = hi = 0
        for i in order:
            top = queries[i]
            bottom = top - x
            # <= admits a log at exactly q; strict < keeps q - x inside,
            # so both interval edges stay inclusive.
            while hi < len(logs) and logs[hi][1] <= top:
                cnt[logs[hi][0]] += 1
                if cnt[logs[hi][0]] == 1:
                    distinct += 1
                hi += 1
            while lo < hi and logs[lo][1] < bottom:
                cnt[logs[lo][0]] -= 1
                if cnt[logs[lo][0]] == 0:
                    distinct -= 1
                lo += 1
            arr[i] = n - distinct
        return arr
