from typing import List, Optional
from collections import deque


class Solution:
    def racecar(self, target: int) -> int:
        bound = 2 * target
        queue = deque([(0, 1)])
        visited = {(0, 1)}
        steps = 0
        while queue:
            for _ in range(len(queue)):
                pos, speed = queue.popleft()
                if pos == target:
                    return steps
                # Accelerate.
                np, ns = pos + speed, speed * 2
                if -bound <= np <= bound and (np, ns) not in visited:
                    visited.add((np, ns))
                    queue.append((np, ns))
                # Reverse.
                ns = -1 if speed > 0 else 1
                if (pos, ns) not in visited:
                    visited.add((pos, ns))
                    queue.append((pos, ns))
            steps += 1
        return -1
