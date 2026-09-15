from typing import List, Optional

import heapq


class Solution:
    def isPossible(self, target: List[int]) -> bool:
        n = len(target)
        # With no "rest" to un-mix against, the only reachable target is [1].
        if n == 1:
            return target[0] == 1
        total = sum(target)
        # Reverse simulation: the total strictly grows each operation, so the
        # largest element of any reachable state was necessarily written last.
        # Max-heap via negated values; `total` tracks the current array sum.
        heap = [-v for v in target]
        heapq.heapify(heap)
        while True:
            largest = -heapq.heappop(heap)
            # Max is 1 => every other element (never larger) is also 1.
            if largest == 1:
                return True
            rest = total - largest
            # The last write must have exceeded the rest of the array; it
            # also catches rest == 0 before the division.
            if largest <= rest:
                return False
            # Batch-jump consecutive un-mixings of the same element in one
            # go: `steps` reversals leave largest mod rest biased to [1, rest],
            # avoiding one-rest-at-a-time subtraction on 1e9-scale gaps.
            steps = (largest - 1) // rest
            prev = largest - steps * rest
            heapq.heappush(heap, -prev)
            total = rest + prev
