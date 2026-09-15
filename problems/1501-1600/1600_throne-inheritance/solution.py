from typing import List, Optional


class ThroneInheritance:
    # An n-ary tree keyed by name: children[name] holds that person's kids
    # in birth order, and dead holds everyone marked deceased. The king's
    # name is remembered as the traversal root.

    def __init__(self, kingName: str):
        self.king = kingName
        self.children: dict[str, list[str]] = {kingName: []}
        self.dead: set[str] = set()

    def birth(self, parentName: str, childName: str):
        self.children[parentName].append(childName)
        self.children[childName] = []

    def death(self, name: str):
        self.dead.add(name)

    def getInheritanceOrder(self) -> List[str]:
        # Iterative pre-order DFS (explicit stack, so depth never risks the
        # call stack — the tree can chain up to 1e5 generations deep).
        # Children go on the stack in reverse so the oldest child is
        # popped, and therefore visited, first.
        order = []
        stack = [self.king]
        while stack:
            name = stack.pop()
            if name not in self.dead:
                order.append(name)
            kids = self.children[name]
            for child in reversed(kids):
                stack.append(child)
        return order
