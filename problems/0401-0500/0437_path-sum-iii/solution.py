from typing import List, Optional


class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        # counter maps root-to-node prefix sums seen on the current path to
        # their counts; {0: 1} counts paths starting at a node itself.
        counter = {}
        counter[0] = 1

        def dfs(node, running):
            if not node:
                return 0
            running += node.val
            # A path ending here with the target starts at an ancestor whose
            # prefix equals running - targetSum (prefix(v) - prefix(u) trick).
            total = counter.get(running - targetSum, 0)
            # Register this prefix only after the lookup so a path never
            # pairs a node with itself unless targetSum is 0 via u == v.
            counter[running] = counter.get(running, 0) + 1
            total += dfs(node.left, running)
            total += dfs(node.right, running)
            # Undo on backtrack: left-subtree prefixes must not pair with
            # right-subtree nodes, so lookups see true ancestors only.
            counter[running] -= 1
            return total

        return dfs(root, 0)
