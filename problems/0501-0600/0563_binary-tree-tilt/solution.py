from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def findTilt(self, root: Optional[TreeNode]) -> int:
        # Post-order, one pass: by the time a node is settled, both of its
        # subtrees have reported their sums, so its tilt |left - right|
        # falls out of those two numbers — a missing child reports 0 — and
        # the same visit yields the node's own sum for its parent. The
        # traversal carries its own stack of frames: the tree may be a
        # single 10^4-node chain, whose walk would nest 10000 calls — past
        # CPython's default recursion limit and over the 512k stacks the
        # judge hands Java and Node — so every runtime iterates instead.
        total_tilt = 0
        # Frame = [node, state, left subtree sum, right subtree sum]; state
        # counts the children still to visit: 0 = left pending, 1 = right
        # pending, 2 = ready to sum the node itself.
        stack = []
        if root is not None:
            stack.append([root, 0, 0, 0])
        while stack:
            frame = stack[-1]
            if frame[1] == 0:
                frame[1] = 1
                if frame[0].left is not None:
                    stack.append([frame[0].left, 0, 0, 0])
            elif frame[1] == 1:
                frame[1] = 2
                if frame[0].right is not None:
                    stack.append([frame[0].right, 0, 0, 0])
            else:
                stack.pop()
                left, right = frame[2], frame[3]
                total_tilt += abs(left - right)
                total = frame[0].val + left + right
                if stack:
                    parent = stack[-1]
                    # The parent's state tells which subtree just finished:
                    # 1 = its left child, 2 = its right child.
                    if parent[1] == 1:
                        parent[2] = total
                    else:
                        parent[3] = total
        return total_tilt
