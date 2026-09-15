import heapq
from typing import List


class Solution:
    def busiestServers(self, k: int, arrival: List[int], load: List[int]) -> List[int]:
        tree = [0] * (k + 1)

        def update(server: int, delta: int) -> None:
            i = server + 1
            while i <= k:
                tree[i] += delta
                i += i & (-i)

        def query(count: int) -> int:
            # Number of free servers with 0-indexed id < count.
            s = 0
            i = count
            while i > 0:
                s += tree[i]
                i -= i & (-i)
            return s

        def find_kth(rank: int) -> int:
            pos = 0
            pw = 1
            while pw * 2 <= k:
                pw *= 2
            while pw > 0:
                if pos + pw <= k and tree[pos + pw] < rank:
                    pos += pw
                    rank -= tree[pos]
                pw //= 2
            return pos

        for server in range(k):
            update(server, 1)

        counts = [0] * k
        heap: List[tuple] = []
        for i, start_time in enumerate(arrival):
            while heap and heap[0][0] <= start_time:
                _, freed = heapq.heappop(heap)
                update(freed, 1)

            total_free = query(k)
            if total_free == 0:
                continue

            start = i % k
            before_start = query(start)
            if before_start < total_free:
                server = find_kth(before_start + 1)
            else:
                server = find_kth(1)

            update(server, -1)
            counts[server] += 1
            heapq.heappush(heap, (start_time + load[i], server))

        busiest = max(counts)
        return [server for server in range(k) if counts[server] == busiest]
