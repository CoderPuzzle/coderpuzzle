from collections import deque
from typing import List, Optional


class Solution:
    def minInteger(self, num: str, k: int) -> str:
        n = len(num)
        # Fenwick tree over 1..n; bit[p] = 1 means the digit originally at
        # position p is still unplaced. Prefix sums answer "how many
        # unplaced digits sit before position p" in O(log n).
        tree = [0] * (n + 1)

        def update(i: int, delta: int) -> None:
            while i <= n:
                tree[i] += delta
                i += i & (-i)

        def query(i: int) -> int:
            total = 0
            while i > 0:
                total += tree[i]
                i -= i & (-i)
            return total

        for i in range(1, n + 1):
            update(i, 1)

        # Per-digit queues of remaining original (1-indexed) positions, in
        # increasing order, so the front is always the cheapest to reach.
        positions: List[deque] = [deque() for _ in range(10)]
        for i, ch in enumerate(num):
            positions[int(ch)].append(i + 1)

        result = []
        for _ in range(n):
            for d in range(10):
                if not positions[d]:
                    continue
                p = positions[d][0]
                # Cost to bring this digit to the front of the unplaced
                # suffix: one swap per still-active digit before it.
                cost = query(p - 1)
                if cost <= k:
                    positions[d].popleft()
                    update(p, -1)
                    k -= cost
                    result.append(str(d))
                    break
        return "".join(result)
