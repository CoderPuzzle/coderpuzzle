from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def constructMaximumBinaryTree(self, nums: List[int]) -> Optional[TreeNode]:
        # The half-built tree's right spine holds exactly the still-open
        # maxima — values strictly decreasing from the root down — so it
        # lives on a stack. A new value dominates every smaller top: each
        # popped subtree is finished and can only hang left of it, and the
        # last one out (the run's largest) is its left child.
        stack: List[TreeNode] = []
        for value in nums:
            node = TreeNode(value)
            last: Optional[TreeNode] = None
            while stack and stack[-1].val < value:
                last = stack.pop()
            node.left = last
            if stack:
                # Whatever survives is larger, so the new node is its right
                # child — this link is rewritten only after the previous
                # child was popped and re-hung one level down.
                stack[-1].right = node
            stack.append(node)
        # The bottom of the stack is the largest value ever seen: the root.
        return stack[0]
