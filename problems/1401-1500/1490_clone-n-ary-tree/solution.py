from collections import deque
from typing import Optional


# Bundle-provided types (assembled with this submission):
#   Node: .val int, .children list[Node]


class Solution:
    def cloneTree(self, root: Optional[Node]) -> Optional[Node]:
        if root is None:
            return None
        # Level-order copy: every original node gets exactly one fresh
        # clone, and the registry records which clone belongs to it, so
        # each original child link is replayed through the registry.
        clones = {root: Node(root.val)}
        queue = deque([root])
        while queue:
            node = queue.popleft()
            for child in node.children:
                clones[child] = Node(child.val)
                clones[node].children.append(clones[child])
                queue.append(child)
        return clones[root]
