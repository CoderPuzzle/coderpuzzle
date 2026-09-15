from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        node = root
        # Loop invariant: the only memory the walk keeps is the cursor and
        # the predecessor it is currently hunting; the path back up to any
        # node still awaiting its visit is threaded into the tree's own
        # right pointers, to be cut again once the node has been read.
        while node is not None:
            if node.left is not None:
                # Hunt the inorder predecessor first — the rightmost node of
                # the left subtree — stopping early if the right spine
                # already ends in a thread pointing back here.
                pred = node.left
                while pred.right is not None and pred.right is not node:
                    pred = pred.right
                if pred.right is None:
                    # Fresh ground: thread the predecessor back to this node
                    # and descend left, planning to return via the thread.
                    pred.right = node
                    node = node.left
                else:
                    # The thread says the left subtree is finished: read the
                    # node, cut the thread, and step right.
                    result.append(node.val)
                    pred.right = None
                    node = node.right
            else:
                result.append(node.val)
                node = node.right
        return result
