from typing import List


class LockingTree:
    # Owner per node (-1 = unlocked) plus children adjacency built from the
    # parent array; upgrade enumerates descendants with an explicit stack
    # so a 2000-node chain is never recursed into.
    def __init__(self, parent: List[int]):
        self.parent = parent
        self.owner = [-1] * len(parent)
        self.children = [[] for _ in parent]
        for node in range(1, len(parent)):
            self.children[parent[node]].append(node)

    def lock(self, num: int, user: int) -> bool:
        if self.owner[num] != -1:
            return False
        self.owner[num] = user
        return True

    def unlock(self, num: int, user: int) -> bool:
        if self.owner[num] != user:
            return False
        self.owner[num] = -1
        return True

    def upgrade(self, num: int, user: int) -> bool:
        # Condition 1: the node itself must be unlocked.
        if self.owner[num] != -1:
            return False
        # Condition 3: no ancestor may be locked.
        node = self.parent[num]
        while node != -1:
            if self.owner[node] != -1:
                return False
            node = self.parent[node]
        # Condition 2: at least one locked descendant. Collect every
        # descendant iteratively so the check and the later unlock share
        # one traversal.
        descendants = []
        stack = list(self.children[num])
        has_locked = False
        while stack:
            node = stack.pop()
            descendants.append(node)
            if self.owner[node] != -1:
                has_locked = True
            stack.extend(self.children[node])
        if not has_locked:
            return False
        self.owner[num] = user
        for node in descendants:
            self.owner[node] = -1
        return True
