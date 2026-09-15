from typing import List, Optional


class Solution:
    def maxScore(self, edges: List[List[int]]) -> int:
        n = len(edges)
        if n == 1:
            return 0
        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[edges[i][0]].append(i)
        # Iterative preorder; iterating it in reverse finalizes every child
        # before its parent, so no recursion (n can be 1e5, deep chains).
        order = []
        stack = [0]
        while stack:
            u = stack.pop()
            order.append(u)
            stack.extend(children[u])
        dp0 = [0] * n  # parent edge not chosen
        dp1 = [0] * n  # parent edge chosen (weight accounted by the parent)
        for u in reversed(order):
            # base = take no child edge: sum of children in state 0.
            base = 0
            best_gain = 0
            for c in children[u]:
                w = edges[c][1]
                base += dp0[c]
                # Switching c's edge on: child must drop its parent edge.
                gain = dp1[c] + w - dp0[c]
                if gain > best_gain:
                    best_gain = gain
            # u may take at most one child edge; only a positive gain is
            # applied, so negative-weight edges are never forced in.
            dp0[u] = base + best_gain
            # Parent edge taken => no child edge allowed for u.
            dp1[u] = base
        return dp0[0]
