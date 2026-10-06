# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


class Solution:
    def binaryTreeHeight(self, root: TreeNode | None) -> int:
        depth = 0
        level = [root] if root is not None else []
        # Loop invariant: `level` holds exactly one level's nodes, so one
        # full round of rebuilding it counts exactly one level of depth.
        while level:
            depth += 1
            # Collect only the real children; a leaf contributes nothing, so
            # an all-leaf level ends the traversal with `depth` complete.
            level = [child for node in level for child in (node.left, node.right) if child is not None]
        return depth
