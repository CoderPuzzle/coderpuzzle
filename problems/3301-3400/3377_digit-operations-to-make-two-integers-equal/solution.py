import heapq


class Solution:
    def minOperations(self, n: int, m: int) -> int:
        # Every value n takes must be non-prime and keeps exactly len(n)
        # digits — decrementing a leading 1 is not a legal op — so the
        # states form a tiny graph: fewer than 1e4 nodes, at most 8
        # single-digit +-1 moves each. Dijkstra with the destination
        # value as the edge weight and the start value as the initial
        # cost sums every value n takes, original included (the example
        # path 10 -> 20 -> 21 -> 22 -> 12 costs 10+20+21+22+12 = 85).
        # Each state contributes its value at most once and weights are
        # < 1e4, so costs stay under 1e8 — safely inside 32-bit range.
        limit = 10000
        is_comp = bytearray(limit)
        for i in range(2, limit):
            if not is_comp[i]:
                for j in range(i * i, limit, i):
                    is_comp[j] = 1

        def is_prime(v):
            return v >= 2 and not is_comp[v]

        if is_prime(n) or is_prime(m):
            return -1
        width = len(str(n))
        top = 10 ** (width - 1)
        dist = [-1] * limit
        dist[n] = n
        heap = [(n, n)]
        while heap:
            d, u = heapq.heappop(heap)
            if d > dist[u]:
                continue
            if u == m:
                return d
            p = top
            for _ in range(width):
                digit = (u // p) % 10
                for y in (u + p if digit < 9 else 0, u - p if digit > 0 and not (p == top and digit == 1) else 0):
                    if y and not is_prime(y) and (dist[y] < 0 or d + y < dist[y]):
                        dist[y] = d + y
                        heapq.heappush(heap, (d + y, y))
                p //= 10
        return -1
