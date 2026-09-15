from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:
        result: List[List[int]] = []
        if root is None:
            # The empty tree has no root-to-leaf paths at all.
            return result
        # `path` is one shared buffer: every accepted path is a copy, and the
        # walk truncates the buffer back instead of rebuilding it per node.
        path: List[int] = []
        # Preorder with an explicit stack — the same shape in every language,
        # chosen because recursion would overflow Python's call-stack limit
        # on a 5000-node chain. A frame carries the node, the remaining sum
        # before paying for it, and the buffer length on entry: popping the
        # frame later truncates `path` to that prefix, which is exactly the
        # backtracking a recursive call stack would have performed.
        stack = [(root, targetSum, 0)]
        while stack:
            node, remaining, depth = stack.pop()
            del path[depth:]
            path.append(node.val)
            remaining -= node.val
            if node.left is None and node.right is None:
                if remaining == 0:
                    # A leaf whose root-to-leaf sum is on target: record a
                    # copy, since `path` keeps mutating after this point.
                    result.append(path.copy())
                continue
            # Push the right child first so the left subtree is popped first:
            # matching paths are discovered in preorder, left to right.
            if node.right is not None:
                stack.append((node.right, remaining, depth + 1))
            if node.left is not None:
                stack.append((node.left, remaining, depth + 1))
        return result
