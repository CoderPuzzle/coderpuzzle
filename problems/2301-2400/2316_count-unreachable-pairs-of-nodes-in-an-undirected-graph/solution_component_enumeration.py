class Solution:
    def countPairs(self, n: int, edges: list[list[int]]) -> int:
        # components answer the question: all C(n, 2) pairs minus the pairs
        # inside one component, so enumerate each component exactly once
        adj = [[] for _ in range(n)]
        for a, b in edges:
            # an undirected edge is walkable both ways, so each endpoint
            # records the other as a neighbour
            adj[a].append(b)
            adj[b].append(a)

        visited = [False] * n
        # a plain list with a read cursor serves as the queue: append is the
        # push, the advancing cursor the pop. The walk is iterative end to
        # end -- recursive DFS would nest 10^5 frames on one long component
        reachable = 0
        for seed in range(n):
            if visited[seed]:
                continue
            visited[seed] = True
            queue = [seed]
            head = 0
            # marking a node when it is enqueued, not when it is dequeued,
            # keeps every node in the queue exactly once
            while head < len(queue):
                u = queue[head]
                head += 1
                for v in adj[u]:
                    if not visited[v]:
                        visited[v] = True
                        queue.append(v)
            # the queue now holds precisely this component: its size*(size-1)/2
            # internal pairs are exactly the reachable pairs it contributes
            size = len(queue)
            reachable += size * (size - 1) // 2
        # whatever remains of C(n, 2) counts each unreachable pair once
        return n * (n - 1) // 2 - reachable
