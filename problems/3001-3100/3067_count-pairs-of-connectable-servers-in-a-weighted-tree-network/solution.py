from typing import List


class Solution:
    def countPairsOfConnectableServers(self, edges: List[List[int]], signalSpeed: int) -> List[int]:
        n = len(edges) + 1

        adj = [[] for _ in range(n)]
        for a, b, w in edges:
            adj[a].append((b, w))
            adj[b].append((a, w))

        answer = [0] * n

        # For each server c, flood every branch (one component per neighbor)
        # separately, counting the servers whose distance from c is divisible
        # by signalSpeed. Two paths out of c share an edge exactly when they
        # leave along the same first edge, so cross-branch pairs are exactly
        # the connectable ones; c itself sits in no branch, which is also
        # what rules it out as an endpoint.
        for c in range(n):
            total = 0
            square_sum = 0
            for root_v, root_w in adj[c]:
                count = 0
                # A parent guard prevents revisits -- sufficient in a tree,
                # and an explicit stack keeps the walk off the call stack.
                stack = [(root_v, c, root_w % signalSpeed)]
                while stack:
                    u, parent, dist = stack.pop()
                    if dist == 0:
                        count += 1
                    for v, w in adj[u]:
                        if v != parent:
                            stack.append((v, u, (dist + w) % signalSpeed))
                total += count
                square_sum += count * count
            # Cross-branch pairs: sum of cnt_i * cnt_j over i < j.
            answer[c] = (total * total - square_sum) // 2
        return answer
