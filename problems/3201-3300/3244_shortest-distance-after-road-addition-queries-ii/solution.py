from typing import List, Optional


class Solution:
    def shortestDistanceAfterQueries(self, n: int, queries: List[List[int]]) -> List[int]:
        # nxt[i] is the next hop from city i on the maintained route. A road
        # (u, v) helps only when u is still on the route and it jumps past
        # nxt[u]; splicing it in retires each leapfrogged city. Retired
        # cities never return, so total work stays linear.
        nxt = list(range(1, n))
        count = n - 1
        answer = []
        for u, v in queries:
            j = nxt[u]
            if 0 < j < v:
                while j < v:
                    count -= 1
                    nxt[j], j = 0, nxt[j]
                nxt[u] = v
            answer.append(count)
        return answer
