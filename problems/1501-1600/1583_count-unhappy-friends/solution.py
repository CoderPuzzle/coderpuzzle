from typing import List, Optional


class Solution:
    def unhappyFriends(self, n: int, preferences: List[List[int]], pairs: List[List[int]]) -> int:
        # rank[i][j] = how highly friend i ranks friend j (lower = more preferred).
        rank = [[0] * n for _ in range(n)]
        for i in range(n):
            for position, friend in enumerate(preferences[i]):
                rank[i][friend] = position

        partner = [0] * n
        for x, y in pairs:
            partner[x] = y
            partner[y] = x

        unhappy = 0
        for x in range(n):
            y = partner[x]
            for u in range(n):
                if u == x or u == y:
                    continue
                v = partner[u]
                if rank[x][u] < rank[x][y] and rank[u][x] < rank[u][v]:
                    unhappy += 1
                    break
        return unhappy
