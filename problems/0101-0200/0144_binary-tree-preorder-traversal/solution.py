from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        if root is None:
            return result
        # Loop invariant: `stack` holds exactly the discovered-but-unvisited
        # nodes, in the order preorder wants them next.
        stack = [root]
        while stack:
            node = stack.pop()
            # Preorder visits a node before either of its subtrees.
            result.append(node.val)
            # Push right before left: the stack pops from the top, so the
            # left child (and its entire subtree) is traversed first.
            if node.right is not None:
                stack.append(node.right)
            if node.left is not None:
                stack.append(node.left)
        return result
