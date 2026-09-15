import heapq


class Solution:
    def assignTasks(self, servers: List[int], tasks: List[int]) -> List[int]:
        # free is ordered (weight, index); busy is ordered by release
        # time. Drain finished servers, wait for the earliest if needed,
        # then hand the task to the smallest free server.
        free = [(w, i) for i, w in enumerate(servers)]
        heapq.heapify(free)
        busy = []
        ans = []
        cur = 0
        for j, cost in enumerate(tasks):
            cur = max(cur, j)
            while busy and busy[0][0] <= cur:
                _, w, i = heapq.heappop(busy)
                heapq.heappush(free, (w, i))
            if not free:
                cur = busy[0][0]
                while busy and busy[0][0] <= cur:
                    _, w, i = heapq.heappop(busy)
                    heapq.heappush(free, (w, i))
            w, i = heapq.heappop(free)
            heapq.heappush(busy, (cur + cost, w, i))
            ans.append(i)
        return ans
