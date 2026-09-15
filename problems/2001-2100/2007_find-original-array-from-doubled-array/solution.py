from collections import Counter
from typing import List


class Solution:
    def findOriginalArray(self, changed: List[int]) -> List[int]:
        if len(changed) % 2 == 1:
            return []

        changed.sort()
        counts = Counter(changed)
        original = []
        for value in changed:
            if counts[value] == 0:
                continue
            counts[value] -= 1
            doubled = value * 2
            if counts[doubled] == 0:
                return []
            counts[doubled] -= 1
            original.append(value)
        return original
