from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def checkEquivalence(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        # The only operator is '+', commutative and associative, so two
        # expression trees agree on every variable assignment exactly
        # when they carry the same multiset of leaf variables, whatever
        # their shape. -1 marks an operator node (always 2 children);
        # 0-25 marks a leaf's encoded letter (always 0 children).
        def leaf_counts(root: Optional[TreeNode]) -> List[int]:
            counts = [0] * 26
            stack = [] if root is None else [root]
            while stack:
                node = stack.pop()
                if node.left is None and node.right is None:
                    counts[node.val] += 1
                else:
                    stack.append(node.left)
                    stack.append(node.right)
            return counts

        return leaf_counts(root1) == leaf_counts(root2)
