from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def delNodes(self, root: Optional[TreeNode], to_delete: List[int]) -> List[Optional[TreeNode]]:
        deleted = set(to_delete)
        forest = []

        def dfs(node: Optional[TreeNode]) -> Optional[TreeNode]:
            if node is None:
                return None
            # Recurse into both children first; the pruned results reattach
            # below, so deletions deep in the tree are already settled.
            node.left = dfs(node.left)
            node.right = dfs(node.right)
            if node.val in deleted:
                # This node vanishes; whichever children survived are cut
                # loose here and become new tree roots.
                if node.left is not None:
                    forest.append(node.left)
                if node.right is not None:
                    forest.append(node.right)
                return None
            return node

        remaining = dfs(root)
        # The one surviving root no deletion created is the original root.
        if remaining is not None:
            forest.append(remaining)
        return forest
