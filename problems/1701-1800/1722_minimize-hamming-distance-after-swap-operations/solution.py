from typing import List, Optional
from collections import Counter


class Solution:
    def minimumHammingDistance(self, source: List[int], target: List[int], allowedSwaps: List[List[int]]) -> int:
        n = len(source)
        parent = list(range(n))

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        # Swaps chain into connected components where values can be permuted
        # arbitrarily, and values never leave their component.
        for a, b in allowedSwaps:
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        groups = {}
        for i in range(n):
            groups.setdefault(find(i), []).append(i)

        # Per component, match target values against the multiset of source
        # values; each unmatched target must stay different.
        distance = 0
        for members in groups.values():
            have = Counter(source[i] for i in members)
            for i in members:
                v = target[i]
                if have.get(v, 0) > 0:
                    have[v] -= 1
                else:
                    distance += 1
        return distance
