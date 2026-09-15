from collections import deque
from typing import List, Optional


class Solution:
    def findLexSmallestString(self, s: str, a: int, b: int) -> str:
        n = len(s)
        seen = {s}
        queue = deque([s])
        best = s

        while queue:
            cur = queue.popleft()
            if cur < best:
                best = cur

            digits = list(cur)
            for i in range(1, n, 2):
                digits[i] = str((int(digits[i]) + a) % 10)
            added = "".join(digits)
            if added not in seen:
                seen.add(added)
                queue.append(added)

            rotated = cur[-b:] + cur[:-b]
            if rotated not in seen:
                seen.add(rotated)
                queue.append(rotated)

        return best
