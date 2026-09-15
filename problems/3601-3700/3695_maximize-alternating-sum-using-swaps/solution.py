from typing import List, Optional


class Solution:
    def maxAlternatingSum(self, nums: List[int], swaps: List[List[int]]) -> int:
        # A pair lets its two indices trade values any number of times, so
        # each connected component of the swap graph rearranges freely:
        # merge the pair's endpoints with a union-find.
        n = len(nums)
        parent = list(range(n))
        size = [1] * n

        def find(x):
            # Two-pass path compression keeps every later find near O(1).
            root = x
            while parent[root] != root:
                root = parent[root]
            while parent[x] != root:
                parent[x], x = root, parent[x]
            return root

        for p, q in swaps:
            rp, rq = find(p), find(q)
            if rp == rq:
                continue
            if size[rp] < size[rq]:
                rp, rq = rq, rp
            parent[rq] = rp
            size[rp] += size[rq]

        # Collect each component's values and count its even-index slots.
        groups = {}
        for i in range(n):
            r = find(i)
            if r not in groups:
                groups[r] = [[], 0]
            groups[r][0].append(nums[i])
            if i % 2 == 0:
                groups[r][1] += 1

        # With E even slots in a component, placing its E largest values on
        # them contributes 2*sumTopE - sumAll; totals reach ~1e14, far past
        # 32 bits.
        ans = 0
        for vals, evens in groups.values():
            vals.sort(reverse=True)
            ans += 2 * sum(vals[:evens]) - sum(vals)
        return ans
