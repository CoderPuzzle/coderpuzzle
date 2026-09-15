from typing import List


class Solution:
    def queryConversions(self, conversions: List[List[int]], queries: List[List[int]]) -> List[int]:
        MOD = 1_000_000_007
        n = len(conversions) + 1
        # The edges form a tree rooted at unit 0. fromRoot[u] is the number
        # of units of type u equivalent to one unit of type 0: the residue
        # of the product of factors along the path from the root.
        children = [[] for _ in range(n)]
        for source, target, factor in conversions:
            children[source].append((target, factor))
        from_root = [1] * n
        stack = [0]
        while stack:
            unit = stack.pop()
            for child, factor in children[unit]:
                from_root[child] = from_root[unit] * factor % MOD
                stack.append(child)
        # 1 unit of type a equals fromRoot[b] / fromRoot[a] units of type b.
        # Every factor is < MOD, so no path residue can be 0 and the Fermat
        # inverse always exists.
        return [from_root[b] * pow(from_root[a], MOD - 2, MOD) % MOD for a, b in queries]
