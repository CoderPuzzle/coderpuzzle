from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def checkEqualTree(self, root: Optional[TreeNode]) -> bool:
        # Removing one edge detaches exactly one subtree; the two parts are
        # that subtree and everything else, so the split is equal exactly
        # when some subtree sums to half of the whole tree's total. One
        # post-order pass computes every subtree sum, and the root's own
        # sum, the last to finish, is that total. The traversal carries its
        # own stack of frames: the tree may be a single 10^4-node chain,
        # whose walk would nest 10000 calls — past CPython's default
        # recursion limit and over the 512k stacks the judge hands Java and
        # Node — so every runtime iterates instead.
        sums = set()
        total = 0
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
                total = frame[0].val + frame[2] + frame[3]
                if stack:
                    # A parent still waits above, so this was a proper
                    # subtree — the only cut candidates. The whole tree
                    # never counts as a part: with total 0 the root's own
                    # sum would match its half spuriously.
                    sums.add(total)
                    parent = stack[-1]
                    # The parent's state tells which subtree just finished:
                    # 1 = its left child, 2 = its right child.
                    if parent[1] == 1:
                        parent[2] = total
                    else:
                        parent[3] = total
        # An odd total never halves into integers — parity still bites with
        # negatives (-9 is as odd as 9). Python ints are unbounded, where
        # 10^4 nodes of 10^5 each reach 10^9, the very rim of 32 bits.
        return total % 2 == 0 and total // 2 in sums
