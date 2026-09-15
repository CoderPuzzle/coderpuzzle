from typing import List


class Solution:
    def transformArray(self, arr: List[int]) -> List[int]:
        current = arr
        while True:
            # Whole day from a snapshot: neighbors are yesterday's values.
            nxt = list(current)
            for i in range(1, len(current) - 1):
                if current[i] < current[i - 1] and current[i] < current[i + 1]:
                    nxt[i] = current[i] + 1
                elif current[i] > current[i - 1] and current[i] > current[i + 1]:
                    nxt[i] = current[i] - 1
            if nxt == current:
                return current
            current = nxt
