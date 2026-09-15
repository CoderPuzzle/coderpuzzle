from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        stack = []
        node = root
        # Loop invariant: `stack` holds the ancestors whose left subtrees
        # are still being descended into; `node` is the next subtree to
        # process (None means it is time to pop back up instead).
        while node is not None or stack:
            # Descend the left spine, remembering every node on it.
            while node is not None:
                stack.append(node)
                node = node.left
            # The stack top is now the leftmost unvisited node of the
            # current subtree — the next value in inorder order.
            node = stack.pop()
            result.append(node.val)
            # The popped node's left subtree is done; traverse its right
            # subtree in full before any ancestor below it is visited.
            node = node.right
        return result
