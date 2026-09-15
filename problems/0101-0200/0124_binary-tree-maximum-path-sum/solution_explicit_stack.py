class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxPathSum(self, root: TreeNode | None) -> int:
        # A path must contain at least one node, so start at -inf, not 0.
        best = float("-inf")
        # Explicit post-order: (node, phase) frames replace the call stack.
        # Phase 0 = first visit (descend left), 1 = left done (descend
        # right), 2 = both done (combine). Finished single-side gains pile
        # on their own stack, the children's results waiting for the parent.
        stack: list[tuple[TreeNode, int]] = []
        gains: list[int] = []
        if root is not None:
            stack.append((root, 0))
        while stack:
            node, phase = stack.pop()
            if phase == 0:
                # Reschedule as phase 1, then let the left subtree run
                # first by sitting on top of the stack.
                stack.append((node, 1))
                if node.left is not None:
                    stack.append((node.left, 0))
            elif phase == 1:
                stack.append((node, 2))
                if node.right is not None:
                    stack.append((node.right, 0))
            else:
                # Both subtrees finished: right's gain sits above left's on
                # the gain stack (left ran first). Missing children left
                # nothing to pop, which is the None case below.
                right_gain = gains.pop() if node.right is not None else None
                left_gain = gains.pop() if node.left is not None else None

                def clamp(gain: int | None) -> int:
                    # Clamp each side at 0: a negative branch is better left
                    # unvisited, and a missing child contributes nothing.
                    if gain is None or gain < 0:
                        return 0
                    return gain

                down_left = clamp(left_gain)
                down_right = clamp(right_gain)
                # The path bending through this node is a candidate for the
                # global answer.
                best = max(best, node.val + down_left + down_right)
                # The parent may only extend the path through one side.
                gains.append(node.val + max(down_left, down_right))
        return best
