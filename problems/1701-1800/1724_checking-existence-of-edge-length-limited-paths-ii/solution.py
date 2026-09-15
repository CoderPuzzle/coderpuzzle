from typing import List


class DistanceLimitedPathsExist:
    """A Kruskal minimum spanning forest annotated for max-edge queries:
    uniting the edges cheapest first leaves, between every pair of nodes,
    a tree path whose largest edge is as small as the graph allows, so
    "some path uses only edges < limit" reduces to reading that one tree
    path's maximum off a binary-lifting table and comparing it to limit.
    """

    def __init__(self, n: int, edgeList: List[List[int]]):
        # Kruskal: sorting by distance and uniting components turns the
        # accepted edges into one minimum spanning tree per component.
        parent = list(range(n))

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        adjacency: List[List[List[int]]] = [[] for _ in range(n)]
        for u, v, dis in sorted(edgeList, key=lambda edge: edge[2]):
            root_u, root_v = find(u), find(v)
            if root_u != root_v:
                parent[root_u] = root_v
                adjacency[u].append([v, dis])
                adjacency[v].append([u, dis])

        # One BFS per component fixes each node's root, depth, and parent
        # edge. A root's own parent entry stays (itself, 0), so a lifting
        # hop never runs off the top of its tree.
        self.depth = [0] * n
        root_of = list(range(n))
        up = [[node for node in range(n)]]
        max_edge = [[0] * n]
        visited = [False] * n
        for start in range(n):
            if visited[start]:
                continue
            visited[start] = True
            root_of[start] = start
            queue = [start]
            for node in queue:
                for neighbor, dis in adjacency[node]:
                    if not visited[neighbor]:
                        visited[neighbor] = True
                        root_of[neighbor] = start
                        self.depth[neighbor] = self.depth[node] + 1
                        up[0][neighbor] = node
                        max_edge[0][neighbor] = dis
                        queue.append(neighbor)

        # Lifting levels: up[j][node] is the 2^j-th ancestor and max_edge
        # the largest weight on that hop — two half-hops glued together.
        self.log = max(1, (max(self.depth) + 1).bit_length())
        self.up = [up[0]]
        self.max_edge = [max_edge[0]]
        for _ in range(1, self.log):
            previous_up, previous_max = self.up[-1], self.max_edge[-1]
            next_up = [0] * n
            next_max = [0] * n
            for node in range(n):
                half = previous_up[node]
                next_up[node] = previous_up[half]
                next_max[node] = max(previous_max[node], previous_max[half])
            self.up.append(next_up)
            self.max_edge.append(next_max)
        self.root_of = root_of

    def query(self, p: int, q: int, limit: int) -> bool:
        # Distinct spanning trees means no path exists at any limit.
        if self.root_of[p] != self.root_of[q]:
            return False
        if p == q:
            return True
        best = 0
        a, b = (p, q) if self.depth[p] >= self.depth[q] else (q, p)
        # Lift the deeper node level by level until both depths match,
        # collecting every edge weight the hops pass over.
        diff = self.depth[a] - self.depth[b]
        level = 0
        while diff:
            if diff & 1:
                best = max(best, self.max_edge[level][a])
                a = self.up[level][a]
            diff >>= 1
            level += 1
        if a == b:
            return best < limit
        # Lift both together while their 2^level ancestors differ — that
        # stops just below the LCA — then take the final parent edges.
        for level in range(self.log - 1, -1, -1):
            if self.up[level][a] != self.up[level][b]:
                best = max(best, self.max_edge[level][a], self.max_edge[level][b])
                a = self.up[level][a]
                b = self.up[level][b]
        best = max(best, self.max_edge[0][a], self.max_edge[0][b])
        return best < limit
