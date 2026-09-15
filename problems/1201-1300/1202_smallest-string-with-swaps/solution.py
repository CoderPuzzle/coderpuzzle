from typing import List, Optional


class Solution:
    def smallestStringWithSwaps(self, s: str, pairs: List[List[int]]) -> str:
        n = len(s)
        parent = list(range(n))

        def find(x):
            # path halving keeps the trees shallow
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        # chained swaps let any two indices in one component exchange, so a
        # component's character multiset is fixed but freely permutable
        for a, b in pairs:
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        # scanning i in increasing order keeps each index list sorted
        groups = {}
        for i in range(n):
            groups.setdefault(find(i), []).append(i)

        result = list(s)
        for indices in groups.values():
            # smallest characters to the smallest indices of the component;
            # components are independent so this is globally optimal
            chars = sorted(result[i] for i in indices)
            for i, ch in zip(sorted(indices), chars):
                result[i] = ch
        return "".join(result)
