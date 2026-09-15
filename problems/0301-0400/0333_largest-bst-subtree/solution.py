from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def largestBSTSubtree(self, root: Optional[TreeNode]) -> int:
        # Post-order, one pass: every subtree reports whether it is a BST,
        # its size, and its min/max value; a node is a BST exactly when both
        # children are BSTs and left.max < node.val < right.min, so each
        # node is judged from its two child reports alone. The traversal
        # carries its own stack of frames: the tree may be a single 10^4-
        # node chain, whose judgement nests 10000 calls — past CPython's
        # default recursion limit and over the 512k stacks the judge hands
        # Java and Node — so every runtime iterates instead.
        best = 0
        # Frame = [node, state, left report, right report]; state counts
        # the children still to visit: 0 = left pending, 1 = right
        # pending, 2 = ready to judge the node itself.
        stack = []
        if root is not None:
            stack.append([root, 0, None, None])
        while stack:
            frame = stack[-1]
            if frame[1] == 0:
                frame[1] = 1
                if frame[0].left is not None:
                    stack.append([frame[0].left, 0, None, None])
            elif frame[1] == 1:
                frame[1] = 2
                if frame[0].right is not None:
                    stack.append([frame[0].right, 0, None, None])
            else:
                stack.pop()
                node, left, right = frame[0], frame[2], frame[3]
                # An absent child is an empty BST: size 0, and never a
                # violation at this node.
                is_bst = (left is None or (left[0] and left[3] < node.val)) and (
                    right is None or (right[0] and node.val < right[2])
                )
                if is_bst:
                    size = 1 + (left[1] if left is not None else 0) + (right[1] if right is not None else 0)
                    if size > best:
                        best = size
                    report = (
                        True,
                        size,
                        left[2] if left is not None else node.val,
                        right[3] if right is not None else node.val,
                    )
                else:
                    # Size and range are junk here: the parent sees the
                    # False flag first and never reads them.
                    report = (False, 0, 0, 0)
                if stack:
                    parent = stack[-1]
                    if parent[1] == 1:
                        parent[2] = report
                    else:
                        parent[3] = report
        return best
