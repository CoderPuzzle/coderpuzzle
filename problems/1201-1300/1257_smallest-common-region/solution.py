from typing import List


class Solution:
    def findSmallestRegion(self, regions: List[List[str]], region1: str, region2: str) -> str:
        parent = {}
        for group in regions:
            for child in group[1:]:
                parent[child] = group[0]
        # Ancestor chain of region1, itself included.
        chain = set()
        node = region1
        while True:
            chain.add(node)
            if node not in parent:
                break
            node = parent[node]
        # First ancestor of region2 inside that chain is the LCA.
        node = region2
        while node not in chain:
            node = parent[node]
        return node
