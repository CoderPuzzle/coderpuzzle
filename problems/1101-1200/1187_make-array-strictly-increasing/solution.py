from typing import List, Optional
import bisect


class Solution:
    def makeArrayIncreasing(self, arr1: List[int], arr2: List[int]) -> int:
        # sorted, distinct replacement candidates so binary search applies
        arr2 = sorted(set(arr2))
        m = len(arr2)
        INF = float("inf")

        # dp: strictly increasing prefix whose last value is v -> min ops.
        # keeping arr1[0] costs 0; any smaller replacement costs 1 (larger
        # replacements are dominated by keeping)
        dp = {arr1[0]: 0}
        for v in arr2:
            if v < arr1[0]:
                dp[v] = 1

        for i in range(1, len(arr1)):
            ndp = {}
            for last, ops in dp.items():
                # keep arr1[i] when it strictly exceeds last: no cost
                if arr1[i] > last:
                    if arr1[i] not in ndp or ndp[arr1[i]] > ops:
                        ndp[arr1[i]] = ops
                # replace with the smallest arr2 value > last: the smallest
                # choice leaves the most room for what follows; costs 1 op
                idx = bisect.bisect_right(arr2, last)
                if idx < m:
                    v = arr2[idx]
                    if v not in ndp or ndp[v] > ops + 1:
                        ndp[v] = ops + 1
            dp = ndp
            # no state survives: a strictly increasing arrangement is impossible
            if not dp:
                return -1

        return min(dp.values())
