from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        # A subtree hangs from some node of root and takes every descendant
        # below it, so the question splits in two: an equality test that
        # settles whether two trees agree in value and shape, and an anchor
        # walk that tries that test rooted at every node of root. Both walks
        # carry their own stacks: a skewed 2000-node root would nest 2000
        # calls — past CPython's default recursion limit of 1000 — and a
        # 1000-node subRoot chain would sit exactly at that edge, so every
        # runtime iterates instead.
        def same_tree(a: Optional[TreeNode], b: Optional[TreeNode]) -> bool:
            # One stack entry settles one aligned node pair: two missing
            # subtrees match, exactly one missing is a shape difference no
            # value can repair — `a is b` is True only when both are None —
            # and when both exist their values must agree here while both
            # child pairs join the stack for the same treatment. An
            # exhausted stack means every pair agreed.
            pending = [(a, b)]
            while pending:
                left, right = pending.pop()
                if left is None or right is None:
                    if left is not right:
                        return False
                    continue
                if left.val != right.val:
                    return False
                pending.append((left.left, right.left))
                pending.append((left.right, right.right))
            return True

        # The anchor walk: pop a node, try the test rooted there, and stack
        # its children. The first accepting anchor answers the whole
        # question; a rejecting anchor costs only the path down which the
        # trees first disagreed.
        anchors = [root]
        while anchors:
            node = anchors.pop()
            if same_tree(node, subRoot):
                return True
            if node.left is not None:
                anchors.append(node.left)
            if node.right is not None:
                anchors.append(node.right)
        return False
