from typing import List, Optional


class Solution:
    def friendRequests(self, n: int, restrictions: List[List[int]], requests: List[List[int]]) -> List[bool]:
        parent = list(range(n))
        size = [1] * n

        def find(node: int) -> int:
            while parent[node] != node:
                parent[node] = parent[parent[node]]
                node = parent[node]
            return node

        answer = []
        for u, v in requests:
            root_u = find(u)
            root_v = find(v)
            allowed = True
            for x, y in restrictions:
                root_x = find(x)
                root_y = find(y)
                if (root_x == root_u and root_y == root_v) or (root_x == root_v and root_y == root_u):
                    allowed = False
                    break

            answer.append(allowed)
            if allowed and root_u != root_v:
                if size[root_u] < size[root_v]:
                    root_u, root_v = root_v, root_u
                parent[root_v] = root_u
                size[root_u] += size[root_v]

        return answer
