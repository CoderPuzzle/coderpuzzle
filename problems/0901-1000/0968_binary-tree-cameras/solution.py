from typing import List, Optional


class Solution:
    def minCameraCover(self, root: Optional[TreeNode]) -> int:
        cameras = 0

        def dfs(node):
            # States: 0 = uncovered, 1 = has a camera, 2 = covered.
            if node is None:
                # Null reports covered so leaves start uncovered and push
                # the first camera one level up.
                return 2
            left = dfs(node.left)
            right = dfs(node.right)
            if left == 0 or right == 0:
                # An uncovered child forces a camera here — the parent of
                # an uncovered node is always the best placement.
                nonlocal cameras
                cameras += 1
                return 1
            if left == 1 or right == 1:
                return 2
            return 0

        # The root has no parent above it to supply coverage.
        if dfs(root) == 0:
            cameras += 1
        return cameras
