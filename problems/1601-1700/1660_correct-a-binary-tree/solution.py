from collections import deque
from typing import Dict, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def correctBinaryTree(self, root: Optional[TreeNode], fromNode: int, toNode: int) -> Optional[TreeNode]:
        # The tree arrives clean — the defect exists only after the
        # custom-testing step — so the first walk rebuilds it: every node
        # recorded by value, the fromNode node's empty right slot pointed
        # at the toNode node. The correction is a breadth-first sweep that
        # takes each level right to left, marking nodes seen on enqueue and
        # carrying each node's parent alongside it. toNode sits right of
        # fromNode on the same depth, so by the time fromNode is dequeued
        # its right child is already seen — and no other node can pass
        # that test, because in a tree every child is enqueued exactly
        # once, by its own parent; only the wired edge breaks that. Detach
        # the offender through the parent beside it and the tree is fixed.
        by_value: Dict[int, TreeNode] = {}
        pending = [root]
        while pending:
            node = pending.pop()
            if node is None:
                continue
            by_value[node.val] = node
            pending.append(node.left)
            pending.append(node.right)
        by_value[fromNode].right = by_value[toNode]
        seen = {root}
        pending = deque([(root, None)])
        while pending:
            node, parent = pending.popleft()
            if node.right is not None and node.right in seen:
                if parent.left is node:
                    parent.left = None
                else:
                    parent.right = None
                return root
            if node.right is not None:
                seen.add(node.right)
                pending.append((node.right, node))
            if node.left is not None:
                seen.add(node.left)
                pending.append((node.left, node))
        return root
