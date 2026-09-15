class Solution:
    def minSwapsCouples(self, row: list[int]) -> int:
        n = len(row)
        pos = [0] * n
        for i, value in enumerate(row):
            pos[value] = i

        slots = n // 2
        parent = list(range(slots))
        size = [1] * slots

        def find(a: int) -> int:
            root = a
            while parent[root] != root:
                root = parent[root]
            while parent[a] != root:  # path compression: point every visited node at the root
                parent[a], a = root, parent[a]
            return root

        groups = slots
        for v in range(0, n, 2):  # each partner pair (v, v ^ 1) links its two slots
            a = find(pos[v] // 2)
            b = find(pos[v ^ 1] // 2)
            if a == b:
                continue
            if size[a] < size[b]:  # union by size: hang the smaller tree under the larger
                a, b = b, a
            parent[b] = a
            size[a] += size[b]
            groups -= 1
        return slots - groups
