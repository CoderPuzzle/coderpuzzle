class Solution:
    def findMinimumTime(self, strength: List[int]) -> int:
        # The k-th lock broken (1-indexed) is charged at factor k: its
        # energy grows by k each minute from 0, so it breaks after exactly
        # ceil(strength / k) minutes. Waiting longer never helps, and X
        # depends only on how many locks are already broken, so the total
        # time is sum over k of ceil(strength[order[k]] / k), minimized
        # over all break orders — a minimum-cost perfect matching between
        # locks and positions, solved by the O(n^3) Hungarian algorithm
        # with potentials.
        n = len(strength)
        cost = [[(s + k) // (k + 1) for k in range(n)] for s in strength]
        INF = 1 << 60
        u = [0] * (n + 1)
        v = [0] * (n + 1)
        p = [0] * (n + 1)  # p[j] = 1-indexed row matched to column j
        way = [0] * (n + 1)
        for i in range(1, n + 1):
            p[0] = i
            j0 = 0
            minv = [INF] * (n + 1)
            used = [False] * (n + 1)
            while True:
                used[j0] = True
                i0 = p[j0]
                delta = INF
                j1 = 0
                for j in range(1, n + 1):
                    if not used[j]:
                        cur = cost[i0 - 1][j - 1] - u[i0] - v[j]
                        if cur < minv[j]:
                            minv[j] = cur
                            way[j] = j0
                        if minv[j] < delta:
                            delta = minv[j]
                            j1 = j
                for j in range(n + 1):
                    if used[j]:
                        u[p[j]] += delta
                        v[j] -= delta
                    else:
                        minv[j] -= delta
                j0 = j1
                if p[j0] == 0:
                    break
            while j0:
                j1 = way[j0]
                p[j0] = p[j1]
                j0 = j1
        return sum(cost[p[j] - 1][j - 1] for j in range(1, n + 1))
