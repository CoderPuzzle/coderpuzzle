from typing import List, Optional


class Solution:
    def countSubtreesForEachDiameter(self, n: int, edges: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n + 1)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        def farthest_within(start: int, mask: int) -> tuple:
            dist = {start: 0}
            queue = [start]
            head = 0
            far_node, far_dist = start, 0
            while head < len(queue):
                node = queue[head]
                head += 1
                for nxt in adj[node]:
                    if (mask >> (nxt - 1)) & 1 and nxt not in dist:
                        dist[nxt] = dist[node] + 1
                        if dist[nxt] > far_dist:
                            far_node, far_dist = nxt, dist[nxt]
                        queue.append(nxt)
            return far_node, far_dist, len(dist)

        ans = [0] * (n - 1)
        for mask in range(1, 1 << n):
            size = bin(mask).count("1")
            if size < 2:
                continue
            start = (mask & -mask).bit_length()
            far1, _, reached = farthest_within(start, mask)
            if reached != size:
                continue
            _, diameter, _ = farthest_within(far1, mask)
            ans[diameter - 1] += 1
        return ans
