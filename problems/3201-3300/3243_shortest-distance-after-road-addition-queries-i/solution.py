from typing import List, Optional


class Solution:
    def shortestDistanceAfterQueries(self, n: int, queries: List[List[int]]) -> List[int]:
        # Every added road can only shorten paths, so nothing computed for
        # an earlier query stays reusable except the road set itself. Keep
        # an adjacency list, append each new road, then run one unweighted
        # BFS from city 0 that stops as soon as city n - 1 is settled.
        # With n, q <= 500 this recomputation per query is cheap and exact.
        roads = [[i + 1] if i + 1 < n else [] for i in range(n)]
        answer = []
        for u, v in queries:
            roads[u].append(v)
            dist = [-1] * n
            dist[0] = 0
            queue = [0]
            head = 0
            while head < len(queue):
                node = queue[head]
                head += 1
                if node == n - 1:
                    break
                for nxt in roads[node]:
                    if dist[nxt] == -1:
                        dist[nxt] = dist[node] + 1
                        queue.append(nxt)
            answer.append(dist[n - 1])
        return answer
