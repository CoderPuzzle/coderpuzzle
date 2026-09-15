from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        # Preorder with an explicit stack — the same shape in every language,
        # chosen because recursion would overflow Python's call-stack limit
        # on a 10'000-node chain. Each entry carries the open interval
        # (lo, hi) its subtree is confined to; ±inf starts every bound
        # wider than any value, so int32 extremes are ordinary values.
        stack = [(root, float("-inf"), float("inf"))]
        while stack:
            node, lo, hi = stack.pop()
            if node is None:
                # An empty subtree satisfies every bound vacuously.
                continue
            # Strict on both sides: equal keys falsify a BST.
            if not lo < node.val < hi:
                return False
            stack.append((node.left, lo, node.val))
            stack.append((node.right, node.val, hi))
        return True
