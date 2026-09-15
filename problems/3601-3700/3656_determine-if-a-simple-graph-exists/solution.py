from typing import List


class Solution:
    def simpleGraphExists(self, degrees: List[int]) -> bool:
        degrees.sort(reverse=True)
        n = len(degrees)
        pre = [0] * (n + 1)
        for i, d in enumerate(degrees):
            pre[i + 1] = pre[i] + d
        total = pre[n]
        # An odd degree sum can never pair up into edges.
        if total % 2 != 0:
            return False
        # big tracks how many entries still exceed k; it only moves left.
        big = n
        for k in range(n + 1):
            while big > 0 and degrees[big - 1] <= k:
                big -= 1
            spared = k * max(big - k, 0) + total - pre[max(big, k)]
            if pre[k] > k * (k - 1) + spared:
                return False
        return True
