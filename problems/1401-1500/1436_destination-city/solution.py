from typing import List, Set


class Solution:
    def destCity(self, paths: List[List[str]]) -> str:
        sources: Set[str] = {a for a, _ in paths}
        for _, destination in paths:
            if destination not in sources:
                return destination
        return ""
