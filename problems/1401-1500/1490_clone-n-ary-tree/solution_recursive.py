import sys
from typing import Optional


# Bundle-provided types (assembled with this submission):
#   Node: .val int, .children list[Node]


class Solution:
    def cloneTree(self, root: Optional[Node]) -> Optional[Node]:
        # A 1000-deep chain nests 1000 calls, past CPython's default
        # recursion limit; lift it so the plain recursion stays viable.
        sys.setrecursionlimit(10000)
        if root is None:
            return None
        clone = Node(root.val)
        clone.children = [self.cloneTree(child) for child in root.children]
        return clone
