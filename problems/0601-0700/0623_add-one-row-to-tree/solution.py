from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def addOneRow(self, root: Optional[TreeNode], val: int, depth: int) -> Optional[TreeNode]:
        if depth == 1:
            # There is no depth 0 to splice under: the whole original tree
            # slips one level down as a fresh root's left subtree.
            return TreeNode(val, root)
        # The insertion row sits at a fixed depth, so the work is only
        # reaching it: a frontier starts at the root and steps down one level
        # per round — non-null children only — until it holds exactly the
        # nodes at depth - 1, the splice points. The frontier walk iterates
        # on purpose: the tree may be a single 10^4-node chain, whose
        # recursive descent would nest 10000 calls — past CPython's default
        # recursion limit and over the 512k stacks the judge hands Java and
        # Node.
        row: List[TreeNode] = [root]
        for _ in range(depth - 2):
            row = [child for node in row for child in (node.left, node.right) if child is not None]
        for node in row:
            # Re-parent, never rebuild: each old subtree stays whole, merely
            # one level deeper under its fresh val node.
            node.left = TreeNode(val, node.left)
            node.right = TreeNode(val, None, node.right)
        return root
