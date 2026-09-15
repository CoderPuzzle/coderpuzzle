from typing import Optional


# bundle-provided type (not editable here; the judge assembles its definition
# into every submission):
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def longestZigZag(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0

        # Iterative post-order: (node, state) where state 0 = expand
        # children, 1 = combine. runs[node_id] holds [arrive-moving-left,
        # arrive-moving-right] depths keyed by id().
        best = 0
        runs = {}
        stack = [(root, 0)]
        while stack:
            node, state = stack.pop()
            if state == 1:
                left_run = 1 + runs[id(node.left)][1] if node.left else 0
                right_run = 1 + runs[id(node.right)][0] if node.right else 0
                runs[id(node)] = (left_run, right_run)
                best = max(best, left_run, right_run)
                continue
            stack.append((node, 1))
            if node.left:
                stack.append((node.left, 0))
            if node.right:
                stack.append((node.right, 0))
        return best
