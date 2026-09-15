from typing import List, Optional
import heapq


class Solution:
    def maxAverageRatio(self, classes: List[List[int]], extraStudents: int) -> float:
        def gain(p, t):
            # One more student in class (p, t) raises its ratio by exactly
            # this, and the gain shrinks as the class grows (concave).
            return (p + 1) / (t + 1) - p / t

        # Average over a fixed class count, so maximize the ratio sum:
        # allocate each identical student where it buys the most.
        heap = [(-gain(p, t), p, t) for p, t in classes]
        heapq.heapify(heap)
        for _ in range(extraStudents):
            _, p, t = heapq.heappop(heap)
            p += 1
            t += 1
            # Re-push: after absorbing a student the class's gain drops and
            # another class may now offer the best marginal return.
            heapq.heappush(heap, (-gain(p, t), p, t))
        return sum(p / t for _, p, t in heap) / len(heap)
