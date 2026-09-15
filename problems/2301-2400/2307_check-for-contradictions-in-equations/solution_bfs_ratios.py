class Solution:
    def checkContradictions(self, equations: list[list[str]], values: list[float]) -> bool:
        EPS = 1e-5
        adj = {}  # adj[x] holds (neighbor, neighbor / x)
        for (a, b), w in zip(equations, values):
            adj.setdefault(a, []).append((b, 1.0 / w))  # b / a = 1 / w
            adj.setdefault(b, []).append((a, w))  # a / b = w

        ratio = {}  # name -> name / root of its component
        for root in adj:
            if root in ratio:
                continue
            ratio[root] = 1.0
            queue = [root]
            head = 0
            while head < len(queue):
                x = queue[head]
                head += 1
                for y, factor in adj[x]:
                    if y not in ratio:
                        ratio[y] = ratio[x] * factor
                        queue.append(y)

        for (a, b), w in zip(equations, values):
            if abs(ratio[a] / ratio[b] - w) > EPS:
                return True
        return False
