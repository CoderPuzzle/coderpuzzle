from typing import List


class Solution:
    def resultsArray(self, queries: List[List[int]], k: int) -> List[int]:
        import heapq

        # Negated distances: heapq is a min-heap, so negation puts the
        # largest of the kept k smallest at index 0.
        heap = []
        result = []
        for x, y in queries:
            d = abs(x) + abs(y)
            if len(heap) < k:
                heapq.heappush(heap, -d)
            elif -heap[0] > d:
                heapq.heapreplace(heap, -d)
            result.append(-heap[0] if len(heap) == k else -1)
        return result
