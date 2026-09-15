from typing import List


class Solution:
    def processQueries(self, queries: List[int], m: int) -> List[int]:
        p = list(range(1, m + 1))
        result = []
        for q in queries:
            pos = p.index(q)
            result.append(pos)
            p.pop(pos)
            p.insert(0, q)
        return result
