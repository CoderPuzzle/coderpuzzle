from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def closestKValues(self, root: Optional[TreeNode], target: float, k: int) -> List[int]:
        # Explicit-stack inorder: the BST flattened to its sorted values, with
        # no recursion that a 10^4-node chain could overflow.
        values = []
        stack = []
        node = root
        while stack or node is not None:
            while node is not None:
                stack.append(node)
                node = node.left
            node = stack.pop()
            values.append(node.val)
            node = node.right
        # Over sorted values the distance to target is V-shaped, so the k
        # closest form one window: start at the split and grow it, each step
        # taking the nearer frontier. A tie goes left — the smaller value —
        # so the picks come out in the statement's pinned order directly.
        left = 0
        while left < len(values) and values[left] < target:
            left += 1
        right = left
        left -= 1
        result = []
        for _ in range(k):
            if right == len(values) or (left >= 0 and abs(values[left] - target) <= abs(values[right] - target)):
                result.append(values[left])
                left -= 1
            else:
                result.append(values[right])
                right += 1
        return result
