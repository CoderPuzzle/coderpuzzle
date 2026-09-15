from typing import List


class Solution:
    def minMoves(self, matrix: List[str]) -> int:
        # BFS in layers, where each layer holds every cell reachable with d
        # moves. Teleports cost 0, so each layer first runs its full closure:
        # the first cell of a letter seen in the layer claims every unvisited
        # cell of that letter. Only then are adjacent cells moved into the
        # next layer — a same-layer teleport must beat a move claimed earlier.
        m, n = len(matrix), len(matrix[0])
        dist = [-1] * (m * n)
        portals = [[] for _ in range(26)]
        for r in range(m):
            for c, ch in enumerate(matrix[r]):
                if "A" <= ch <= "Z":
                    portals[ord(ch) - 65].append(r * n + c)
        used = [False] * 26
        dist[0] = 0
        layer = [0]
        d = 0
        while layer:
            head = 0
            while head < len(layer):
                pos = layer[head]
                head += 1
                ch = matrix[pos // n][pos % n]
                if "A" <= ch <= "Z" and not used[ord(ch) - 65]:
                    k = ord(ch) - 65
                    used[k] = True
                    for q in portals[k]:
                        if dist[q] == -1:
                            dist[q] = d
                            layer.append(q)
            nxt = []
            for pos in layer:
                r, c = divmod(pos, n)
                if r > 0 and dist[pos - n] == -1 and matrix[r - 1][c] != "#":
                    dist[pos - n] = d + 1
                    nxt.append(pos - n)
                if r + 1 < m and dist[pos + n] == -1 and matrix[r + 1][c] != "#":
                    dist[pos + n] = d + 1
                    nxt.append(pos + n)
                if c > 0 and dist[pos - 1] == -1 and matrix[r][c - 1] != "#":
                    dist[pos - 1] = d + 1
                    nxt.append(pos - 1)
                if c + 1 < n and dist[pos + 1] == -1 and matrix[r][c + 1] != "#":
                    dist[pos + 1] = d + 1
                    nxt.append(pos + 1)
            layer = nxt
            d += 1
        return dist[m * n - 1]
