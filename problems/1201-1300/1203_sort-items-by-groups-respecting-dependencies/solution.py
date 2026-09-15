from typing import List, Optional


class Solution:
    def sortItems(self, n: int, m: int, group: List[int], beforeItems: List[List[int]]) -> List[int]:
        group = list(group)
        # Assign each ungrouped item its own private group id.
        for i in range(n):
            if group[i] == -1:
                group[i] = m
                m += 1

        item_adj = [[] for _ in range(n)]
        group_adj = [[] for _ in range(m)]
        group_indeg = [0] * m
        for i in range(n):
            for b in beforeItems[i]:
                item_adj[b].append(i)
                gb, gi = group[b], group[i]
                if gb != gi:
                    group_adj[gb].append(gi)
                    group_indeg[gi] += 1

        def kahn(keys, adj, indeg):
            indeg = indeg.copy()
            available = [k for k in keys if indeg[k] == 0]
            available.sort(reverse=True)  # smallest id pops first (LIFO)
            order = []
            while available:
                u = available.pop()
                order.append(u)
                for v in adj[u]:
                    indeg[v] -= 1
                    if indeg[v] == 0:
                        available.append(v)
            return order if len(order) == len(keys) else None

        group_order = kahn(range(m), group_adj, group_indeg)
        if group_order is None:
            return []

        items_in_group = [[] for _ in range(m)]
        for i in range(n):
            items_in_group[group[i]].append(i)

        result = []
        for g in group_order:
            nodes = items_in_group[g]
            if not nodes:
                continue
            node_set = set(nodes)
            indeg = {u: 0 for u in nodes}
            adj = {u: [] for u in nodes}
            for u in nodes:
                for v in item_adj[u]:
                    if v in node_set:
                        adj[u].append(v)
                        indeg[v] += 1
            order = kahn(nodes, adj, indeg)
            if order is None:
                return []
            result.extend(order)
        return result
