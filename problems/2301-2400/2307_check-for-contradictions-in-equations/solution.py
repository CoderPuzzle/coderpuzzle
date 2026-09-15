from typing import List, Optional


class Solution:
    def checkContradictions(self, equations: List[List[str]], values: List[float]) -> bool:
        EPS = 1e-5
        parent = {}
        weight = {}  # weight[x] = x / parent[x]

        def find(x):
            if x not in parent:
                parent[x] = x
                weight[x] = 1.0
                return x, 1.0
            if parent[x] == x:
                return x, 1.0
            root, w = find(parent[x])
            parent[x] = root
            weight[x] *= w
            return root, weight[x]

        for (a, b), w in zip(equations, values):
            root_a, wa = find(a)  # a = wa * val(root_a)
            root_b, wb = find(b)  # b = wb * val(root_b)
            if root_a == root_b:
                if abs(wa / wb - w) > EPS:
                    return True
            else:
                parent[root_a] = root_b
                weight[root_a] = wb * w / wa
        return False
