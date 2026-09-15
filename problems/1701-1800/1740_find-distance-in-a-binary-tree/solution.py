from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def findDistance(self, root: Optional[TreeNode], p: int, q: int) -> int:
        # One iterative pass — an explicit stack, never recursion, since
        # a skewed tree runs 10^4 nodes deep — records each value's depth
        # and parent. Values are unique, so a value keys both maps. The
        # distance then resolves through the lowest common ancestor:
        # lift the deeper of p and q to the other's depth, walk both up
        # in lockstep until they meet — that meeting point is the LCA —
        # and return depth[p] + depth[q] - 2 * depth[lca], each leg of
        # the path counted once. p == q needs no special case: the lifts
        # make no move, the walk finds the two already equal, and the
        # formula cancels to 0. The root rides with parent None; no
        # climb ever passes the LCA, which is at the latest the root, so
        # the None is never dereferenced.
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
        a, b = p, q
        while depth_of[a] > depth_of[b]:
            a = parent_of[a]
        while depth_of[b] > depth_of[a]:
            b = parent_of[b]
        while a != b:
            a = parent_of[a]
            b = parent_of[b]
        return depth_of[p] + depth_of[q] - 2 * depth_of[a]
