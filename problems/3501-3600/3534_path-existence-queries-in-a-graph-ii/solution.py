from typing import List


class Solution:
    def pathExistenceQueries(self, n: int, nums: List[int], maxDiff: int, queries: List[List[int]]) -> List[int]:
        # In value-sorted order each node reaches a contiguous range of
        # positions, so the farthest position reachable in k hops composes
        # monotonically and binary lifting on the one-hop reach returns hop
        # counts in O(log n) per query.
        order = sorted(range(n), key=lambda i: nums[i])
        rank = [0] * n
        for pos, node in enumerate(order):
            rank[node] = pos

        # Component labels over sorted positions (cut at gaps > maxDiff).
        comp = [0] * n
        for pos in range(1, n):
            comp[pos] = comp[pos - 1] + (1 if nums[order[pos]] - nums[order[pos - 1]] > maxDiff else 0)

        # One-hop reach: rightmost sorted position within maxDiff of i.
        reach = [0] * n
        j = 0
        for i in range(n):
            if j < i:
                j = i
            while j + 1 < n and nums[order[j + 1]] - nums[order[i]] <= maxDiff:
                j += 1
            reach[i] = j

        # up[k][i] = farthest position reachable from i in at most 2^k hops.
        logn = max(1, n.bit_length())
        up = [reach]
        for _ in range(1, logn):
            prev = up[-1]
            up.append([prev[prev[i]] for i in range(n)])

        answer = []
        for u, v in queries:
            su, sv = rank[u], rank[v]
            if comp[su] != comp[sv]:
                answer.append(-1)
            elif su == sv:
                answer.append(0)
            else:
                if su > sv:
                    su, sv = sv, su
                hops = 0
                for k in range(logn - 1, -1, -1):
                    if up[k][su] < sv:
                        su = up[k][su]
                        hops += 1 << k
                answer.append(hops + 1)
        return answer
