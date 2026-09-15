from collections import deque
from typing import List, Optional


class _FenwickTree:
    """1-indexed Fenwick tree over the n original positions of s, tracking
    which positions of one particular digit are still unconsumed."""

    def __init__(self, size: int) -> None:
        self.size = size
        self.tree = [0] * (size + 1)

    def add(self, index: int, delta: int) -> None:
        index += 1
        while index <= self.size:
            self.tree[index] += delta
            index += index & (-index)

    def prefix_count(self, index: int) -> int:
        # count of marked positions with original index < `index`
        total = 0
        while index > 0:
            total += self.tree[index]
            index -= index & (-index)
        return total


class Solution:
    def isTransformable(self, s: str, t: str) -> bool:
        n = len(s)
        if len(t) != n:
            return False

        # queue[d]: original positions in s carrying digit d, oldest first.
        queue = [deque() for _ in range(10)]
        for index, ch in enumerate(s):
            queue[int(ch)].append(index)

        # fenwick[d] marks which occurrences of digit d are still
        # unconsumed, so a prefix query answers "how many remaining
        # digit-d positions sit left of index x".
        fenwick = [_FenwickTree(n) for _ in range(10)]
        for index, ch in enumerate(s):
            fenwick[int(ch)].add(index, 1)

        for ch in t:
            digit = int(ch)
            if not queue[digit]:
                return False
            pos = queue[digit].popleft()
            # any remaining strictly-smaller digit still left of pos
            # permanently blocks it: sorting only lets pos move left past
            # digits strictly greater than it, never past a smaller one.
            blocked = 0
            for smaller in range(digit):
                blocked += fenwick[smaller].prefix_count(pos)
            if blocked:
                return False
            fenwick[digit].add(pos, -1)

        return True
