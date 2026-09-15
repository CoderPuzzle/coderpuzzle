from typing import List, Optional


class Solution:
    def minimumAbsDifference(self, arr: List[int]) -> List[List[int]]:
        arr = sorted(arr)
        best = None
        pairs: List[List[int]] = []
        for a, b in zip(arr, arr[1:]):
            gap = b - a
            if best is None or gap < best:
                # A strictly closer neighbour pair retires everything
                # collected against the old minimum.
                best = gap
                pairs = [[a, b]]
            elif gap == best:
                pairs.append([a, b])
        return pairs
