class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def minCameraCover(self, root: TreeNode | None) -> int:
        inf = float("inf")

        def dfs(node):
            # Triple of minimum monitor counts for the subtree rooted at
            # `node`: [0] the root holds a monitor, [1] the root is covered
            # without one, [2] the root waits uncovered for its parent.
            if node is None:
                # A missing child is free whenever any state is allowed and
                # can never be the monitor holder, so it folds in as
                # (inf, 0, inf).
                return inf, 0, inf
            left = dfs(node.left)
            right = dfs(node.right)
            # A monitor placed here observes both children, so each child
            # may sit in any of its three states.
            with_monitor = 1 + min(left) + min(right)
            # Coverage without own monitor must arrive from a child, and the
            # other child is then on its own — no monitor here can help it.
            covered = min(left[0] + min(right[0], right[1]), right[0] + min(left[0], left[1]))
            # Staying uncovered forbids monitors here and at both children,
            # so each child must already be covered from below.
            uncovered = min(left[0], left[1]) + min(right[0], right[1])
            return with_monitor, covered, uncovered

        # The root has no parent to wait for, so it must already be covered.
        with_monitor, covered, _ = dfs(root)
        return min(with_monitor, covered)
