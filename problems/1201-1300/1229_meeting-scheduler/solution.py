from typing import List


class Solution:
    def minAvailableDuration(self, slots1: List[List[int]], slots2: List[List[int]], duration: int) -> List[int]:
        a = sorted(slots1)
        b = sorted(slots2)
        i = j = 0
        while i < len(a) and j < len(b):
            start = max(a[i][0], b[j][0])
            end = min(a[i][1], b[j][1])
            if end - start >= duration:
                return [start, start + duration]
            # The earlier-ending slot cannot overlap any later slot of the
            # other person, so only that pointer advances.
            if a[i][1] < b[j][1]:
                i += 1
            else:
                j += 1
        return []
