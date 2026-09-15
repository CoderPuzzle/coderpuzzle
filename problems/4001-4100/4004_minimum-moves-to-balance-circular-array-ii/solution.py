import heapq
from typing import List


class Solution:
    def minMoves(self, balance: List[int]) -> int:
        n = len(balance)
        if sum(balance) < 0:
            return -1
        if n == 1:
            return 0

        def line_cost(t: int) -> int:
            # Minimum flow cost on the path 0..n-2 with the wrap edge fixed
            # at signed flow t. Sweep positions keeping the convex suffix-min
            # envelope of the DP as a constant plus rising-flank breakpoints.
            cost = 0
            heap = []  # stored breakpoints; true position = stored + delta
            delta = 0
            for k in range(n - 1):
                delta += balance[k]
                cap = delta
                z = -t
                if heap:
                    low = heap[0] + delta
                    if z <= low:
                        heapq.heappush(heap, z - delta)
                    elif z <= cap:
                        # valley below the current minimum: consume it, and
                        # split the flank in two only inside the support
                        cost += z - low
                        heapq.heapreplace(heap, z - delta)
                        heapq.heappush(heap, z - delta)
                    else:
                        # valley beyond the capped support: the lowest
                        # breakpoint is absorbed into the constant
                        cost += z - low
                        heapq.heappop(heap)
                elif z <= cap:
                    heapq.heappush(heap, z - delta)
                else:
                    cost += z - cap
            # terminal lower bound -balance[n-1] evaluates the envelope
            limit = -balance[n - 1]
            while heap and heap[0] + delta < limit:
                cost += limit - (heapq.heappop(heap) + delta)
            return cost

        def total(t: int) -> int:
            # wrap edge carries |t| itself plus the internal line cost;
            # convex in t, so binary search the integer minimizer
            return abs(t) + line_cost(t)

        bound = total(0)
        lo, hi = -bound, bound
        while lo < hi:
            mid = lo + (hi - lo) // 2
            if total(mid) <= total(mid + 1):
                hi = mid
            else:
                lo = mid + 1
        return total(lo)
