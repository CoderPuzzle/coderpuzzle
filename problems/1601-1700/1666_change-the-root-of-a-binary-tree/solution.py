from typing import Dict, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def flipBinaryTree(self, root: Optional[TreeNode], leaf: int) -> Optional[TreeNode]:
        # Rerooting is a walk, not a rebuild: the rule names, for every
        # node on the leaf-to-root path, exactly which pointers move. One
        # descent first records each node's parent, keyed by value (values
        # are unique, so the first node met with the leaf's value is the
        # leaf itself) — the parent pointers the statement demands, kept
        # in the solver's own map.
        parent: Dict[int, Optional[TreeNode]] = {root.val: None}
        target: Optional[TreeNode] = None
        pending = [root]
        while pending:
            node = pending.pop()
            if node.val == leaf:
                target = node
            for child in (node.left, node.right):
                if child is not None:
                    parent[child.val] = node
                    pending.append(child)
        # Then the two steps are applied bottom-up, stopping before the
        # root: clear the parent's downward pointer (emptying the slot the
        # moved subtree needs), move a surviving left child across to the
        # right, and attach the parent as the new left child. The leaf the
        # walk started from is the new root.
        cur = target
        while parent[cur.val] is not None:
            above = parent[cur.val]
            if above.left is cur:
                above.left = None
            elif above.right is cur:
                above.right = None
            if cur.left is not None:
                cur.right = cur.left
            cur.left = above
            cur = above
        return target
