from typing import List


class Solution:
    def isCovered(self, ranges: List[List[int]], left: int, right: int) -> bool:
        # +1 at start, -1 past end, running sum > 0 means covered.
        diff = [0] * 52
        for s, e in ranges:
            diff[s] += 1
            diff[e + 1] -= 1
        cur = 0
        cover = [False] * 51
        for x in range(1, 51):
            cur += diff[x]
            cover[x] = cur > 0
        return all(cover[x] for x in range(left, right + 1))
