from typing import List


class Solution:
    def sortPeople(self, names: List[str], heights: List[int]) -> List[str]:
        # Sort indices by descending height; heights are distinct, so the
        # comparator fully orders every pair and no stability is relied on.
        order = sorted(range(len(names)), key=lambda i: -heights[i])
        return [names[i] for i in order]
