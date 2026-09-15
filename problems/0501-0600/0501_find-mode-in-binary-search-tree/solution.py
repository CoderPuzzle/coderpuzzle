from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def findMode(self, root: Optional[TreeNode]) -> List[int]:
        # An inorder walk of a BST emits values in ascending order, so all
        # copies of a value sit next to each other: a mode is just the
        # longest run of equal values in that walk. Two passes find it
        # without ever storing a table of counts. The traversal carries its
        # own stack of nodes: the tree may be a single 10^4-node chain,
        # whose walk would nest 10000 calls — past CPython's default
        # recursion limit and over the 512k stacks the judge hands Java and
        # Node — so every runtime iterates instead.
        def inorder(node: Optional[TreeNode]):
            # Descend the left spine stacking every node, then emit each
            # popped node and descend its right child.
            stack: List[TreeNode] = []
            current = node
            while current is not None or stack:
                while current is not None:
                    stack.append(current)
                    current = current.left
                current = stack.pop()
                yield current.val
                current = current.right

        # Pass one measures the longest streak; nothing else is remembered,
        # so no table of counts is ever stored.
        max_streak = 0
        streak = 0
        prev = None
        for value in inorder(root):
            streak = streak + 1 if value == prev else 1
            prev = value
            if streak > max_streak:
                max_streak = streak

        # Pass two re-walks and emits a value exactly when its streak
        # reaches that maximum — once per mode, in ascending order.
        modes: List[int] = []
        streak = 0
        prev = None
        for value in inorder(root):
            streak = streak + 1 if value == prev else 1
            prev = value
            if streak == max_streak:
                modes.append(value)
        return modes
