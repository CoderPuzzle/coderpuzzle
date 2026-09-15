from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        prev = first = second = None
        stack = []
        node = root
        # Loop invariant: `stack` holds the ancestors whose left subtrees are
        # still being descended into; `node` is the next subtree to process
        # (None means it is time to pop back up instead). Inorder of a healthy
        # BST is strictly ascending, so a predecessor greater than its
        # successor marks a misplaced pair: the node before the FIRST descent
        # and after the LAST descent are the two swapped nodes.
        while node is not None or stack:
            # Descend the left spine, remembering every node on it.
            while node is not None:
                stack.append(node)
                node = node.left
            node = stack.pop()
            if prev is not None and prev.val > node.val:
                if first is None:
                    first = prev
                second = node
            prev = node
            node = node.right
        # Swap only values: nodes and links stay put ("without changing its
        # structure"), and the repaired root flows back to the judge.
        first.val, second.val = second.val, first.val
        return root
