from collections import deque
from typing import Optional


class CBTInserter:
    """One breadth-first pass at construction, O(1) work per insert.

    The constructor walks the tree once in level order and queues, in
    `pending`, every node that still has a free child slot — BFS visits
    parents left-to-right, so the queue front is always the parent of the
    next complete position. `insert` attaches a fresh node to the front
    node's missing child, left first, returns the parent's value, and
    maintains the queue: a parent that just filled its right slot leaves,
    and the fresh node — two free slots — joins at the back.
    """

    def __init__(self, root: Optional[TreeNode]) -> None:
        self.root = root
        self.pending: deque = deque()
        queue: deque = deque([root])
        while queue:
            node = queue.popleft()
            if node.left is None or node.right is None:
                self.pending.append(node)
            if node.left is not None:
                queue.append(node.left)
            if node.right is not None:
                queue.append(node.right)

    def insert(self, v: int) -> int:
        parent = self.pending[0]
        node = TreeNode(v)
        if parent.left is None:
            parent.left = node
        else:
            parent.right = node
            self.pending.popleft()
        self.pending.append(node)
        return parent.val

    def get_root(self) -> Optional[TreeNode]:
        return self.root
