from typing import List, Optional

from collections import deque


class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # BFS over amounts: level k holds every amount reachable with
        # exactly k coins, so the first time `amount` is dequeued its level
        # is the minimum coin count. visited keeps each amount enqueued once.
        visited = [False] * (amount + 1)
        visited[0] = True
        queue = deque([0])
        level = 0
        while queue:
            for _ in range(len(queue)):
                a = queue.popleft()
                if a == amount:
                    # Level order guarantees no cheaper level exists.
                    return level
                for c in coins:
                    nxt = a + c
                    if nxt <= amount and not visited[nxt]:
                        visited[nxt] = True
                        queue.append(nxt)
            level += 1
        # The queue drained without ever reaching amount: unmakeable.
        return -1
