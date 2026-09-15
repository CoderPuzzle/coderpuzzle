from typing import List, Set


class Solution:
    def buildArray(self, target: List[int], n: int) -> List[str]:
        wanted: Set[int] = set(target)
        last = target[-1]
        operations: List[str] = []
        for value in range(1, last + 1):
            operations.append("Push")
            if value not in wanted:
                operations.append("Pop")
        return operations
