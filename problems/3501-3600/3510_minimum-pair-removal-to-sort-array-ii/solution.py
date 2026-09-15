from typing import List
import heapq


class Solution:
    def minimumPairRemoval(self, nums: List[int]) -> int:
        # Simulate with a doubly linked list over the original indices and
        # a min-heap of (sum, left, right). A pair is valid only if its left
        # node is still alive and still points at its recorded right
        # neighbour; stale entries are discarded when popped. A "bad count"
        # of adjacent descents tells us when the array is non-decreasing.
        n = len(nums)
        val = [int(v) for v in nums]
        prev = [i - 1 for i in range(n)]
        nxt = [i + 1 for i in range(n)]
        nxt[-1] = -1
        alive = [True] * n
        bad = sum(1 for i in range(n - 1) if val[i] > val[nxt[i]])
        if bad == 0:
            return 0
        heap = []
        for i in range(n - 1):
            heap.append((val[i] + val[i + 1], i, i + 1))
        heapq.heapify(heap)
        ops = 0
        while bad > 0:
            s, a, b = heapq.heappop(heap)
            if not alive[a] or nxt[a] != b or val[a] + val[b] != s:
                continue
            pa = prev[a]
            nb = nxt[b]
            # Folding b into a replaces the three adjacencies (pa,a), (a,b)
            # and (b,nb) with (pa,a) and (a,nb), so adjust bad around them.
            if pa != -1 and val[pa] > val[a]:
                bad -= 1
            if val[a] > val[b]:
                bad -= 1
            if nb != -1 and val[b] > val[nb]:
                bad -= 1
            val[a] += val[b]
            alive[b] = False
            nxt[a] = nb
            if nb != -1:
                prev[nb] = a
            if pa != -1 and val[pa] > val[a]:
                bad += 1
            if nb != -1 and val[a] > val[nb]:
                bad += 1
            ops += 1
            if bad == 0:
                break
            if pa != -1:
                heapq.heappush(heap, (val[pa] + val[a], pa, a))
            if nb != -1:
                heapq.heappush(heap, (val[a] + val[nb], a, nb))
        return ops
