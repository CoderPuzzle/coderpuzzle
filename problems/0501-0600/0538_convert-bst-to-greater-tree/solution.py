from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # Reverse inorder — right subtree, node, left subtree — visits a
        # BST's keys in strictly descending order, so when the walk reaches
        # a node, every key greater than it has already been seen. The
        # running total the walk carries is therefore exactly the node's
        # new value: the original key plus the sum of all greater keys.
        # Add the key to the total, write the total back, and move on — no
        # second pass, no per-node search. The traversal carries its own
        # stack of nodes: the tree may be a single 10^4-node chain, whose
        # walk would nest 10000 calls — past CPython's default recursion
        # limit and over the 512k stacks the judge hands Java and Node —
        # so every runtime iterates instead.
        total = 0
        stack: List[TreeNode] = []
        current = root
        while current is not None or stack:
            # Descend the right spine stacking every node, then visit each
            # popped node and descend its left child.
            while current is not None:
                stack.append(current)
                current = current.right
            current = stack.pop()
            total += current.val
            current.val = total
            current = current.left
        return root
