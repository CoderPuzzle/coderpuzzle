from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def lowestCommonAncestor(self, root: Optional[TreeNode], p: int, q: int) -> Optional[TreeNode]:
        # Iterative pre-order build of a value -> parent-value map (and a
        # value -> node lookup) in one pass. Node values are unique, so a
        # value serves as a stable, hashable key everywhere. Once built,
        # p and q's presence is a plain membership check against node_of —
        # this is the existence check, done for free by the same walk that
        # will drive the LCA search.
        if root is None:
            return None
        parent_of = {root.val: None}
        node_of = {}
        stack = [root]
        while stack:
            node = stack.pop()
            node_of[node.val] = node
            if node.left is not None:
                parent_of[node.left.val] = node.val
                stack.append(node.left)
            if node.right is not None:
                parent_of[node.right.val] = node.val
                stack.append(node.right)
        if p not in node_of or q not in node_of:
            return None
        # Walk p up to the root, collecting every value on that path.
        ancestors = set()
        val = p
        while val is not None:
            ancestors.add(val)
            val = parent_of.get(val)
        # Walk q up until it lands on a value already seen from p; that is
        # the lowest shared ancestor (this also handles p == q and either
        # one already being the other's ancestor, since the starting value
        # is checked before climbing).
        val = q
        while val not in ancestors:
            val = parent_of[val]
        return node_of[val]
