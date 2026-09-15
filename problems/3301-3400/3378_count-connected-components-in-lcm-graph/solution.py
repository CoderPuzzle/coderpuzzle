from typing import List


class Solution:
    def countComponents(self, nums: List[int], threshold: int) -> int:
        # Every edge needs lcm(nums[i], nums[j]) <= threshold, and the lcm
        # is a multiple of both values, so values above the threshold are
        # isolated singletons. Enumerate present values ascending, keeping
        # anchor[m] = the smallest present divisor of each multiple m:
        # every later present divisor of m unions with it, and since both
        # divide m the edge is genuine (lcm | m <= threshold). Every
        # genuine edge (a, b) is covered at m = lcm(a, b). The scans cost
        # the harmonic sum ~threshold*ln(threshold). Iterative DSU with
        # path halving and union by size; values up to 1e9 are never
        # multiplied and the answer fits 32 bits.
        n = len(nums)
        parent = list(range(n))
        size = [1] * n

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra == rb:
                return
            if size[ra] < size[rb]:
                ra, rb = rb, ra
            parent[rb] = ra
            size[ra] += size[rb]

        present = [-1] * (threshold + 1)
        for i, v in enumerate(nums):
            if v <= threshold:
                present[v] = i
        anchor = [-1] * (threshold + 1)
        for v in range(1, threshold + 1):
            i = present[v]
            if i < 0:
                continue
            # join v to the smallest present strict divisor found earlier:
            # lcm(v, anchor[v]) = v <= threshold — without this a value
            # would never meet the divisor group at its own lcm
            a = anchor[v]
            if a >= 0:
                union(i, a)
            for m in range(v + v, threshold + 1, v):
                a = anchor[m]
                if a < 0:
                    anchor[m] = i
                else:
                    union(i, a)
        return sum(1 for i in range(n) if find(i) == i)
