import random


class Skiplist:
    """A skiplist: a stack of sorted singly-linked layers where each higher
    layer skips over roughly half the elements of the one below.

    `add` promotes a fresh node to a random level (geometric, p = 1/2) and
    splices it into every layer up to that level; `search` and `erase`
    descend from the top layer, following the rightmost node whose value is
    still below the target. Each operation touches O(log n) nodes on
    average.
    """

    def __init__(self):
        self._max_level = 16
        self._head = self._Node(-1, self._max_level)

    def _random_level(self):
        level = 1
        while random.randint(0, 1) == 0 and level < self._max_level:
            level += 1
        return level

    def _predecessors(self, target):
        """The rightmost node < target at each layer."""
        update = [None] * self._max_level
        cur = self._head
        for i in range(self._max_level - 1, -1, -1):
            while cur.next[i] is not None and cur.next[i].val < target:
                cur = cur.next[i]
            update[i] = cur
        return update

    def search(self, target: int) -> bool:
        cur = self._head
        for i in range(self._max_level - 1, -1, -1):
            while cur.next[i] is not None and cur.next[i].val < target:
                cur = cur.next[i]
        cur = cur.next[0]
        return cur is not None and cur.val == target

    def add(self, num: int):
        update = self._predecessors(num)
        node = self._Node(num, self._random_level())
        # Splice into each layer the node actually occupies.
        for i in range(len(node.next)):
            node.next[i] = update[i].next[i]
            update[i].next[i] = node

    def erase(self, num: int) -> bool:
        update = self._predecessors(num)
        cur = update[0].next[0]
        if cur is None or cur.val != num:
            return False
        # Unlink cur only from the layers where it is the immediate next
        # node; at higher layers a duplicate with more levels may take over.
        for i in range(self._max_level):
            if update[i].next[i] is cur:
                update[i].next[i] = cur.next[i]
        return True

    class _Node:
        __slots__ = ("val", "next")

        def __init__(self, val, level):
            self.val = val
            self.next = [None] * level
