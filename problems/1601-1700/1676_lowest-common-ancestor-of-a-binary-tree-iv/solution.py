from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def lowestCommonAncestor(self, root: Optional[TreeNode], nodes: List[int]) -> int:
        # One iterative pass — an explicit stack, never recursion, since
        # a skewed tree runs 10^4 nodes deep — records each value's depth
        # and parent. Values are unique, so a value keys both maps. The
        # answer then folds pairwise over the query values: hold the
        # running LCA candidate, and for each further value lift the
        # deeper of the two to the other's depth, then walk both up in
        # lockstep until they meet. The LCA is associative — the LCA of
        # the whole list is the LCA of the running candidate and each new
        # value — so the fold lands on the shared ancestor, and a
        # one-value query returns that value untouched. The root rides
        # with parent None; no climb ever passes the LCA, which is at
        # the latest the root, so the None is never dereferenced.
        depth_of = {root.val: 0}
        parent_of = {root.val: None}
        pending: List[TreeNode] = [root]
        while pending:
            node = pending.pop()
            child_depth = depth_of[node.val] + 1
            if node.left is not None:
                depth_of[node.left.val] = child_depth
                parent_of[node.left.val] = node.val
                pending.append(node.left)
            if node.right is not None:
                depth_of[node.right.val] = child_depth
                parent_of[node.right.val] = node.val
                pending.append(node.right)
        lca = nodes[0]
        for value in nodes[1:]:
            a, b = lca, value
            while depth_of[a] > depth_of[b]:
                a = parent_of[a]
            while depth_of[b] > depth_of[a]:
                b = parent_of[b]
            while a != b:
                a = parent_of[a]
                b = parent_of[b]
            lca = a
        return lca
