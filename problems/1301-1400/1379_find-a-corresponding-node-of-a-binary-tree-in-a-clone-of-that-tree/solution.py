from typing import Optional


# bundle-provided type (not editable here; the judge assembles its definition
# into every submission):
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def getTargetCopy(
        self, original: Optional[TreeNode], cloned: Optional[TreeNode], target: int
    ) -> Optional[TreeNode]:
        # Parallel preorder: identical shapes keep every (original, cloned)
        # pair aligned, so the first original node with the target value
        # hands back exactly the matching cloned subtree.
        stack = [(original, cloned)]
        while stack:
            orig_node, clone_node = stack.pop()
            if orig_node is None:
                continue
            if orig_node.val == target:
                return clone_node
            stack.append((orig_node.left, clone_node.left))
            stack.append((orig_node.right, clone_node.right))
        return None
