from typing import List, Optional


class Solution:
    def subtreeInversionSum(self, edges: List[List[int]], nums: List[int], k: int) -> int:
        n = len(nums)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        # BFS from the root records each parent and an order whose reversal
        # lists children before parents, so the DP below needs no recursion.
        parent = [-1] * n
        order = [0]
        parent[0] = -2
        for u in order:
            for v in adj[u]:
                if v != parent[u]:
                    parent[v] = u
                    order.append(v)

        # dp[u][flip][d]: best subtree sum of u given the parity of sign flips
        # applied from ancestors and the edge distance d to the nearest inverted
        # ancestor, capped at k since any larger distance behaves identically.
        width = k + 1
        dp = [None] * n
        for u in reversed(order):
            # Children are already computed; pool their tables per (flip, distance).
            child_sum = [[0] * width for _ in range(2)]
            for v in adj[u]:
                if v == parent[u]:
                    continue
                cv = dp[v]
                for flip in range(2):
                    row = child_sum[flip]
                    crow = cv[flip]
                    for d in range(width):
                        row[d] += crow[d]

            # Not inverting: children observe distance+1 (capped at k). Once the
            # distance is >= k, inverting u is legal too: it flips the parity and
            # resets the child distance to 1; keep the better of the two options.
            table = [[0] * width for _ in range(2)]
            for flip in range(2):
                s = -1 if flip else 1
                base_dont = nums[u] * s
                base_inv = -nums[u] * s
                dont_row = child_sum[flip]
                inv_row = child_sum[flip ^ 1]
                for dist in range(width):
                    dd = dist + 1 if dist < k else k
                    val_dont = base_dont + dont_row[dd]
                    if dist >= k:
                        val_inv = base_inv + inv_row[1]
                        table[flip][dist] = val_dont if val_dont > val_inv else val_inv
                    else:
                        table[flip][dist] = val_dont
            dp[u] = table
        # The root has no recent inversion above it, so it is free to invert.
        return dp[0][0][k]
