import heapq
from typing import List


class Solution:
    def maxTotalValue(self, nums: List[int], k: int) -> int:
        n = len(nums)
        # Sparse tables: level j holds the max/min of every window of
        # length 2**j, each derived from the previous level in one pass.
        mx = [list(nums)]
        mn = [list(nums)]
        span = 1
        while span * 2 <= n:
            prev_mx, prev_mn = mx[-1], mn[-1]
            mx.append(list(map(max, prev_mx, prev_mx[span:])))
            mn.append(list(map(min, prev_mn, prev_mn[span:])))
            span *= 2
        lg = [0] * (n + 1)
        for i in range(2, n + 1):
            lg[i] = lg[i >> 1] + 1

        def spread(l: int, r: int) -> int:
            # Two overlapping power-of-two windows cover [l, r].
            j = lg[r - l + 1]
            low = 1 << j
            return max(mx[j][l], mx[j][r - low + 1]) - min(mn[j][l], mn[j][r - low + 1])

        # Row l is non-increasing as r shrinks toward l, so the heap merges
        # n sorted rows and always holds each row's largest unseen entry.
        heap = [(-spread(l, n - 1), l, n - 1) for l in range(n)]
        heapq.heapify(heap)
        total = 0
        for _ in range(k):
            neg, l, r = heapq.heappop(heap)
            total -= neg
            if r > l:
                heapq.heappush(heap, (-spread(l, r - 1), l, r - 1))
        return total
