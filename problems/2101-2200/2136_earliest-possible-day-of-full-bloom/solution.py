from typing import List, Optional


class Solution:
    def earliestFullBloom(self, plantTime: List[int], growTime: List[int]) -> int:
        best = 0
        prefix = 0
        # Total planting time is fixed regardless of order, so only the
        # order matters: by an exchange argument, plant slow-growing seeds
        # first so their long growth overlaps the planting of the rest.
        for plant, grow in sorted(zip(plantTime, growTime), key=lambda x: -x[1]):
            # prefix is when this seed finishes planting; it blooms at
            # prefix + grow. The answer is the max over all seeds — a seed
            # finished early can still bloom last.
            prefix += plant
            best = max(best, prefix + grow)
        return best
