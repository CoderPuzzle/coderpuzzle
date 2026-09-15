from typing import List, Optional


class Solution:
    def findPermutation(self, nums: List[int]) -> List[int]:
        n = len(nums)
        full = (1 << n) - 1
        INF = float("inf")

        # f[mask][last] = min additional cost to visit all elements not in
        # mask, starting from `last`, including the closing edge to nums[0]
        f = [[INF] * n for _ in range(1 << n)]
        for last in range(n):
            f[full][last] = abs(last - nums[0])
        for mask in range(full - 1, 0, -1):
            for last in range(n):
                if not (mask >> last) & 1:
                    continue
                best = INF
                for nxt in range(n):
                    if (mask >> nxt) & 1:
                        continue
                    cost = abs(last - nums[nxt]) + f[mask | (1 << nxt)][nxt]
                    if cost < best:
                        best = cost
                f[mask][last] = best

        # greedy reconstruction: smallest next element keeping the cost optimal
        perm = [0]
        mask = 1
        last = 0
        for _ in range(1, n):
            for nxt in range(n):
                if (mask >> nxt) & 1:
                    continue
                if abs(last - nums[nxt]) + f[mask | (1 << nxt)][nxt] == f[mask][last]:
                    perm.append(nxt)
                    mask |= 1 << nxt
                    last = nxt
                    break
        return perm
