from collections import Counter
from typing import List, Optional


class Solution:
    def recoverArray(self, nums: List[int]) -> List[int]:
        values = sorted(nums)
        target_length = len(values) // 2
        for candidate in values[1:]:
            difference = candidate - values[0]
            if difference <= 0 or difference % 2 != 0:
                continue

            counts = Counter(values)
            recovered = []
            for lower in values:
                if counts[lower] == 0:
                    continue
                higher = lower + difference
                if counts[higher] == 0:
                    break
                counts[lower] -= 1
                counts[higher] -= 1
                recovered.append(lower + difference // 2)
            if len(recovered) == target_length:
                return recovered
        return []
