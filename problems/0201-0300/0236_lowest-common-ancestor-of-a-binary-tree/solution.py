from typing import List, Optional


class Solution:
    def lowestCommonAncestor(self, root: Optional[TreeNode], p: int, q: int) -> int:
        # find answers a narrower question per subtree: does it hold p or q?
        # It returns the found target node itself, or None if neither is there.
        def find(node: Optional[TreeNode]) -> Optional[TreeNode]:
            # A node counts as a descendant of itself, so a value match is
            # itself a successful find and we return immediately.
            if node is None or node.val == p or node.val == q:
                return node
            left = find(node.left)
            right = find(node.right)
            # Each side found a target: they meet at this node for the first
            # time — everything below saw at most one — so this is the LCA.
            if left and right:
                return node
            # Otherwise propagate the lone non-None sighting upward.
            return left if left else right

        # Both targets exist and are distinct, so the root call always
        # returns a node whose value is the answer.
        return find(root).val
