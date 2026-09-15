from typing import List, Optional


class Solution:
    def maximumRequests(self, n: int, requests: List[List[int]]) -> int:
        m = len(requests)
        best = 0
        for mask in range(1 << m):
            popcount = bin(mask).count("1")
            if popcount <= best:
                continue
            degree = [0] * n
            for i in range(m):
                if mask & (1 << i):
                    frm, to = requests[i]
                    degree[frm] -= 1
                    degree[to] += 1
            if all(d == 0 for d in degree):
                best = popcount
        return best
