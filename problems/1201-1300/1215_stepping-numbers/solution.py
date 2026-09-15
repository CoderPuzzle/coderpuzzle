from collections import deque
from typing import List


class Solution:
    def countSteppingNumbers(self, low: int, high: int) -> List[int]:
        # Seed with every one-digit number, then extend by one digit: the
        # successor of a number ending in d is built from d-1 and d+1 only.
        out = []
        if low <= 0 <= high:
            out.append(0)
        queue = deque(range(1, 10))
        while queue:
            current = queue.popleft()
            if current > high:
                continue
            if current >= low:
                out.append(current)
            last = current % 10
            for digit in (last - 1, last + 1):
                if 0 <= digit <= 9:
                    queue.append(current * 10 + digit)
        return out
