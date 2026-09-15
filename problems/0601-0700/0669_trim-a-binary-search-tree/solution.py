from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def trimBST(self, root: Optional[TreeNode], low: int, high: int) -> Optional[TreeNode]:
        # A node below low drags its whole left subtree below low with it —
        # discard the node and continue in its right subtree; a node above
        # high is the mirror image. Walking that rule down from the root
        # lands on the first in-range node, the trimmed tree's new root —
        # or falls off the tree when nothing survives.
        while root is not None and (root.val < low or root.val > high):
            root = root.left if root.val > high else root.right
        if root is None:
            return None
        # Every node on the stack is in range, so only its children can be
        # out. Each repair replaces an out-of-range child link with a
        # same-side descendant — exactly the reattachment the recursive trim
        # would make — so surviving nodes keep their original descendants.
        # The traversal carries its own stack of nodes: the tree may be a
        # single 10^4-node chain, whose recursion would nest 10000 calls —
        # past CPython's default recursion limit and over the 512k stacks
        # the judge hands Java and Node — so every runtime iterates instead.
        stack: List[TreeNode] = [root]
        while stack:
            node = stack.pop()
            # A left child below low carries its own left subtree below low
            # too; hoist the child's right child until the link holds a node
            # in range (only the low side can break here: every left value
            # is below the in-range parent, hence at most high).
            while node.left is not None and node.left.val < low:
                node.left = node.left.right
            # A right child above high hoists its left child, symmetrically.
            while node.right is not None and node.right.val > high:
                node.right = node.right.left
            if node.left is not None:
                stack.append(node.left)
            if node.right is not None:
                stack.append(node.right)
        return root
