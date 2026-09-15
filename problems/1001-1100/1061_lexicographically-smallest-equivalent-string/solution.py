from typing import List, Optional


class Solution:
    def smallestEquivalentString(self, s1: str, s2: str, baseStr: str) -> str:
        parent = list(range(26))

        # Path halving: re-point each visited node at its grandparent so the
        # trees flatten as we walk.
        def find(a: int) -> int:
            while parent[a] != a:
                parent[a] = parent[parent[a]]
                a = parent[a]
            return a

        for a, b in zip(s1, s2):
            ra, rb = find(ord(a) - 97), find(ord(b) - 97)
            if ra != rb:
                # The union rule encodes the answer: always attach the larger
                # root under the smaller one, so a component's root is its
                # lexicographically smallest letter.
                if rb < ra:
                    ra, rb = rb, ra
                parent[rb] = ra

        # Each character maps to its component root — the smallest equivalent
        # letter (singletons map to themselves).
        return "".join(chr(97 + find(ord(c) - 97)) for c in baseStr)
