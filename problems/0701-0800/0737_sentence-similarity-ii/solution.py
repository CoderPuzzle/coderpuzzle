from typing import List, Optional


class Solution:
    def areSentencesSimilarTwo(self, sentence1: List[str], sentence2: List[str], similarPairs: List[List[str]]) -> bool:
        # Different lengths can never be similar.
        if len(sentence1) != len(sentence2):
            return False

        parent = {}

        def find(x):
            # Unseen words register as their own singleton component.
            parent.setdefault(x, x)
            # Path halving keeps the structure flat.
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        # Symmetry + transitivity: similar exactly when identical or in the
        # same component, so unioning the pairs captures the whole relation.
        for a, b in similarPairs:
            union(a, b)

        for a, b in zip(sentence1, sentence2):
            # Identical words pass; otherwise the roots must agree.
            if a != b and find(a) != find(b):
                return False
        return True
