from typing import Optional


# Bundle-provided types (assembled with this submission):
#   Node: .val int, .children list[Node]


class Solution:
    def cloneTree(self, root: Optional[Node]) -> Optional[Node]:
        if root is None:
            return None
        clone = Node(root.val)
        clone.children = [self.cloneTree(child) for child in root.children]
        return clone
