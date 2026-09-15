from bisect import bisect_left
from typing import List


class Solution:
    def maximumSumQueries(self, nums1: List[int], nums2: List[int], queries: List[List[int]]) -> List[int]:
        n = len(nums1)
        points = sorted(((nums1[j], nums2[j]) for j in range(n)), key=lambda p: -p[0])
        order = sorted(range(len(queries)), key=lambda k: -queries[k][0])

        keys: List[int] = []
        bests: List[int] = []

        def insert(y: int, total: int) -> None:
            pos = bisect_left(keys, y)
            if pos < len(keys) and keys[pos] == y:
                if bests[pos] >= total:
                    return
                keys.pop(pos)
                bests.pop(pos)
            if pos < len(keys) and bests[pos] >= total:
                return
            while pos > 0 and bests[pos - 1] <= total:
                keys.pop(pos - 1)
                bests.pop(pos - 1)
                pos -= 1
            keys.insert(pos, y)
            bests.insert(pos, total)

        answer = [-1] * len(queries)
        pi = 0
        for qi in order:
            bound_x, bound_y = queries[qi]
            while pi < n and points[pi][0] >= bound_x:
                point_x, point_y = points[pi]
                insert(point_y, point_x + point_y)
                pi += 1
            pos = bisect_left(keys, bound_y)
            if pos < len(keys):
                answer[qi] = bests[pos]
        return answer
