from typing import List, Optional


class Solution:
    def rearrangeBarcodes(self, barcodes: List[int]) -> List[int]:
        n = len(barcodes)
        counts = {}
        for b in barcodes:
            counts[b] = counts.get(b, 0) + 1

        order = sorted(counts.keys(), key=lambda v: (-counts[v], v))

        result = [0] * n
        pos = 0
        for value in order:
            for _ in range(counts[value]):
                if pos >= n:
                    pos = 1
                result[pos] = value
                pos += 2

        return result
