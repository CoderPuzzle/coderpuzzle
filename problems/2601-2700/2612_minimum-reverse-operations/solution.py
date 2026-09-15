from typing import List


class Solution:
    def minReverseOperations(self, n: int, p: int, banned: List[int], k: int) -> List[int]:
        class Slots:
            # Alive positions of one parity as jump pointers: first(pos)
            # returns the smallest alive slot >= pos. Removing a slot fuses
            # it into its successor, so every position is consumed once.
            __slots__ = ("parent",)

            def __init__(self, size: int):
                self.parent = list(range(size + 1))

            def first(self, pos: int) -> int:
                parent = self.parent
                root = pos
                while parent[root] != root:
                    root = parent[root]
                while parent[pos] != root:
                    parent[pos], pos = root, parent[pos]
                return root

            def remove(self, pos: int) -> None:
                self.parent[pos] = pos + 1

        answer = [-1] * n
        slots = [Slots((n + 1 - parity) // 2) for parity in (0, 1)]

        def consume(position: int) -> None:
            slots[position & 1].remove(position >> 1)

        consume(p)
        for b in banned:
            consume(b)

        queue = [p]
        answer[p] = 0
        head = 0
        while head < len(queue):
            x = queue[head]
            head += 1
            left = max(0, x - k + 1)
            right = min(x, n - k)
            if left > right:
                continue
            lo = 2 * left + k - 1 - x
            hi = 2 * right + k - 1 - x
            nodes = slots[lo & 1]
            step = lo >> 1
            slot = nodes.first(step)
            while 2 * slot + (lo & 1) <= hi:
                y = 2 * slot + (lo & 1)
                answer[y] = answer[x] + 1
                queue.append(y)
                nodes.remove(slot)
                slot = nodes.first(slot + 1)
        return answer
