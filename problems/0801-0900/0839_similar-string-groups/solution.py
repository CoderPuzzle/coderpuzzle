from typing import List, Optional


class Solution:
    def numSimilarGroups(self, strs: List[str]) -> int:
        def similar(a: str, b: str) -> bool:
            # All words are mutual anagrams, so they are similar iff
            # they differ in 0 or 2 positions — exactly what one swap
            # fixes; bail on the third mismatch.
            mismatches = 0
            for x, y in zip(a, b):
                if x != y:
                    mismatches += 1
                    if mismatches > 2:
                        return False
            return mismatches == 0 or mismatches == 2

        n = len(strs)
        parent = list(range(n))

        def find(x: int) -> int:
            # Path halving keeps repeated lookups nearly constant.
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        # Union every similar pair: groups are the transitive closure,
        # so indirectly similar words share a root.
        for i in range(n):
            for j in range(i + 1, n):
                if similar(strs[i], strs[j]):
                    root_i, root_j = find(i), find(j)
                    if root_i != root_j:
                        parent[root_i] = root_j

        # The answer is the number of distinct roots remaining.
        return len({find(i) for i in range(n)})
