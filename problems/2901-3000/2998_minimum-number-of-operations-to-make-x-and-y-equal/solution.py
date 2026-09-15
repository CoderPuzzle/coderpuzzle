class Solution:
    def minimumOperationsToMakeEqual(self, x: int, y: int) -> int:
        # Values are states and every operation is a unit-cost edge, so BFS
        # layers count operations. Only +1 ever raises the value, so a
        # target at or above x costs exactly y - x steps; below x, an
        # optimal path never climbs past x + (x - y), which the
        # 1 <= x, y <= 10^4 box keeps under 2 * 10^4.
        limit = 20010
        dist = [-1] * (limit + 1)
        dist[x] = 0
        queue = [x]
        head = 0
        while head < len(queue):
            v = queue[head]
            head += 1
            if v == y:
                return dist[v]
            steps = [v - 1, v + 1]
            if v % 11 == 0:
                steps.append(v // 11)
            if v % 5 == 0:
                steps.append(v // 5)
            for nxt in steps:
                if 1 <= nxt <= limit and dist[nxt] == -1:
                    dist[nxt] = dist[v] + 1
                    queue.append(nxt)
        return dist[y]
