from typing import List, Optional


class Solution:
    def maximumScoreAfterOperations(self, edges: List[List[int]], values: List[int]) -> int:
        # A tree stays healthy exactly when every root-to-leaf path keeps at
        # least one un-taken node. dp[x] is the best score inside x's subtree
        # while every x-to-leaf path must still keep a node: keep x (its value
        # stays, so every descendant is free to take: the child subtree sums)
        # or take x and let each child subtree solve the same problem (dp of
        # the children). A leaf must keep itself, so its dp is 0. The answer
        # is dp[0]. n reaches 2 * 10^4 on path-shaped trees, so the two walks
        # run on explicit arrays, never on the call stack.
        n = len(values)
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)
        # Iterative BFS from the root: fixes a parent for every node and an
        # order in which every parent precedes its children.
        parent = [-1] * n
        has_child = [False] * n
        order = [0]
        parent[0] = 0
        head = 0
        while head < len(order):
            x = order[head]
            head += 1
            for y in adj[x]:
                if parent[y] == -1:
                    parent[y] = x
                    has_child[x] = True
                    order.append(y)
        # Reverse order visits children before parents; each finished node
        # hands its subtree sum and dp value up to its parent.
        sub_sum = [0] * n
        dp = [0] * n
        for x in reversed(order):
            here = values[x] + sub_sum[x]
            if has_child[x]:
                dp[x] = max(values[x] + dp[x], here - values[x])
            # A leaf keeps itself, so dp stays 0.
            sub_sum[x] = here
            if x != 0:
                sub_sum[parent[x]] += here
                dp[parent[x]] += dp[x]
        return dp[0]
