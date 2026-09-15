from typing import List, Optional


class Solution:
    def maxProfit(
        self,
        n: int,
        present: List[int],
        future: List[int],
        hierarchy: List[List[int]],
        budget: int,
    ) -> int:
        children = [[] for _ in range(n)]
        for u, v in hierarchy:
            children[u - 1].append(v - 1)

        # Knapsack merge of the children's budget profiles: spend t in one child
        # against every budget level b, then take a prefix maximum so leftover
        # budget never lowers a value.
        def combine(arrays):
            cur = [0] * (budget + 1)
            for arr in arrays:
                nxt = cur[:]
                for b in range(budget + 1):
                    cb = cur[b]
                    for t in range(budget - b + 1):
                        val = cb + arr[t]
                        if val > nxt[b + t]:
                            nxt[b + t] = val
                cur = nxt
                for b in range(1, budget + 1):
                    if cur[b] < cur[b - 1]:
                        cur[b] = cur[b - 1]
            return cur

        # BFS order lets every node's children finish before the node itself.
        order = [0]
        for u in order:
            for v in children[u]:
                order.append(v)

        # f[u][b]: best profit in u's subtree within budget b when u's boss did
        # not buy (u pays the full price); g[u][b]: the boss did buy (u may pay
        # half). The discount depends only on the direct boss, so two profiles
        # are enough.
        f = [None] * n
        g = [None] * n
        for u in reversed(order):
            child_f = combine([f[c] for c in children[u]])
            child_g = combine([g[c] for c in children[u]])

            # If u does not buy, its children get no discount, so both tables
            # start from merged child_f. Buying switches to child_g (children
            # become discount-eligible) at the full or halved cost respectively.
            fu = child_f[:]
            gu = child_f[:]
            cost_full = present[u]
            cost_disc = present[u] // 2
            profit_full = future[u] - cost_full
            profit_disc = future[u] - cost_disc
            for b in range(budget + 1):
                if b >= cost_full:
                    val = child_g[b - cost_full] + profit_full
                    if val > fu[b]:
                        fu[b] = val
                if b >= cost_disc:
                    val = child_g[b - cost_disc] + profit_disc
                    if val > gu[b]:
                        gu[b] = val
            # Re-apply a prefix maximum after folding in u's own purchase.
            for b in range(1, budget + 1):
                if fu[b] < fu[b - 1]:
                    fu[b] = fu[b - 1]
                if gu[b] < gu[b - 1]:
                    gu[b] = gu[b - 1]
            f[u] = fu
            g[u] = gu
        # The CEO has no boss and therefore never gets a discount.
        return f[0][budget]
