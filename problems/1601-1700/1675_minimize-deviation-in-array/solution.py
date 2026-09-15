from typing import List, Optional
import heapq


class Solution:
    def minimumDeviation(self, nums: List[int]) -> int:
        # Normalize: odd values are doubled once — their only upward move —
        # so afterwards every element can only shrink by halving, and every
        # reachable configuration is still visited.
        heap = [-(v * 2 if v % 2 else v) for v in nums]
        heapq.heapify(heap)
        # The heap yields the maximum; the minimum is tracked separately.
        current_min = min(-v for v in heap)
        # Snapshot the untouched configuration before any halving.
        best = (-heap[0]) - current_min
        # An even maximum can still be halved; once the maximum is odd
        # nothing can grow, so the deviation can never improve again.
        while heap[0] % 2 == 0:
            top = -heapq.heappop(heap)
            half = top // 2
            heapq.heappush(heap, -half)
            if half < current_min:
                current_min = half
            # Re-check max − min after each halving.
            deviation = (-heap[0]) - current_min
            if deviation < best:
                best = deviation
        return best
