from typing import List, Set


class Solution:
    def countElements(self, arr: List[int]) -> int:
        seen: Set[int] = set(arr)
        return sum(1 for x in arr if x + 1 in seen)
