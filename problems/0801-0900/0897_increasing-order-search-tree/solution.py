from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def increasingBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # The required tree's values, read from its root down its only
        # right links, are ascending — exactly the order an in-order walk
        # of a binary search tree visits. So the answer is that walk,
        # relinked: the leftmost node (visited first) becomes the root,
        # every left link is severed, every right link points at the next
        # visited node. The traversal carries its own stack of deferred
        # nodes rather than recursing, so no runtime call stack is touched
        # at all: the stack holds the current left spine only.
        nodes: List[TreeNode] = []
        stack: List[TreeNode] = []
        current: Optional[TreeNode] = root
        while current is not None or stack:
            # Descend one left spine, deferring every node on it.
            while current is not None:
                stack.append(current)
                current = current.left
            # The stack top is now the leftmost unvisited node: visit it
            # and continue the walk in its right subtree.
            node = stack.pop()
            nodes.append(node)
            current = node.right
        # Relink the visit order into the spine: the last node keeps no
        # right child, and no node keeps a left child.
        for i, node in enumerate(nodes):
            node.left = None
            node.right = nodes[i + 1] if i + 1 < len(nodes) else None
        return nodes[0] if nodes else None
