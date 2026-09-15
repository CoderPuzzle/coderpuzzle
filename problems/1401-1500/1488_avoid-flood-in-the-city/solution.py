from typing import List
from bisect import bisect_right, insort


class Solution:
    def avoidFlood(self, rains: List[int]) -> List[int]:
        n = len(rains)
        zeros: List[int] = []
        last: dict = {}
        ans = [-1] * n
        for i, r in enumerate(rains):
            if r == 0:
                ans[i] = 1
                insort(zeros, i)
            else:
                if r in last:
                    j = bisect_right(zeros, last[r])
                    if j == len(zeros) or zeros[j] >= i:
                        return []
                    ans[zeros[j]] = r
                    zeros.pop(j)
                last[r] = i
        return ans
