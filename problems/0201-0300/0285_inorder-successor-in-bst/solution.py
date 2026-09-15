from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def inorderSuccessor(self, root: Optional[TreeNode], p: int) -> Optional[TreeNode]:
        # One descent from the root, remembering the last node the walk
        # stepped left from: it is the best successor candidate so far —
        # smaller than every earlier candidate, still greater than p.
        successor: Optional[TreeNode] = None
        node = root
        while node is not None:
            if p < node.val:
                successor = node
                node = node.left
            elif p > node.val:
                node = node.right
            else:
                # Found p: with a right child the successor is the leftmost
                # node of that subtree; without one it is the candidate the
                # walk already remembers. Neither exists -> None, p is the
                # largest value in the tree.
                node = node.right
                while node is not None:
                    successor = node
                    node = node.left
                break
        return successor
