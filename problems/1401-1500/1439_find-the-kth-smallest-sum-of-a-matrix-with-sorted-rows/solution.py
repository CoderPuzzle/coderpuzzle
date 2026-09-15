import heapq
from typing import List, Set, Tuple


class Solution:
    def kthSmallest(self, mat: List[List[int]], k: int) -> int:
        m = len(mat)
        first = tuple(0 for _ in range(m))
        heap: List[Tuple[int, Tuple[int, ...]]] = [(sum(row[0] for row in mat), first)]
        seen: Set[Tuple[int, ...]] = {first}
        answer = 0
        for _ in range(k):
            total, indexes = heapq.heappop(heap)
            answer = total
            for r in range(m):
                if indexes[r] + 1 < len(mat[r]):
                    candidate = indexes[:r] + (indexes[r] + 1,) + indexes[r + 1 :]
                    if candidate not in seen:
                        seen.add(candidate)
                        next_total = total - mat[r][indexes[r]] + mat[r][indexes[r] + 1]
                        heapq.heappush(heap, (next_total, candidate))
        return answer
