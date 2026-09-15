from collections import deque
from typing import List


class Solution:
    def maxCandies(
        self,
        status: List[int],
        candies: List[int],
        keys: List[List[int]],
        containedBoxes: List[List[int]],
        initialBoxes: List[int],
    ) -> int:
        n = len(status)
        # Two waiting rooms: owned-but-locked boxes, and the openable queue.
        locked_held = set()
        opened = [False] * n
        total = 0

        def acquire(box: int) -> None:
            # Ownership event: an initial box, or one found inside another.
            if opened[box] or box in locked_held:
                return
            if status[box] == 1:
                queue.append(box)
            else:
                locked_held.add(box)

        queue = deque()
        for b in initialBoxes:
            acquire(b)

        while queue:
            b = queue.popleft()
            if opened[b]:
                continue
            opened[b] = True
            total += candies[b]
            for k in keys[b]:
                status[k] = 1
                if k in locked_held:
                    # The key only matters for a box already owned and parked;
                    # release it into the queue now that it unlocks.
                    locked_held.discard(k)
                    queue.append(k)
            for c in containedBoxes[b]:
                acquire(c)
        return total
