from typing import List, Optional


class Solution:
    def distributeCoins(self, root: Optional[TreeNode]) -> int:
        moves = 0

        # dfs returns the subtree's excess: coins minus nodes. That excess
        # must cross the edge to the parent, one move per coin.
        def dfs(node):
            if node is None:
                return 0
            left = dfs(node.left)
            right = dfs(node.right)
            nonlocal moves
            # Each |excess| is the flow on that child edge; flows on
            # separate edges never interfere, so summing them is total moves.
            moves += abs(left) + abs(right)
            # Keep one coin for this node; the rest is the parent-bound flow.
            return node.val + left + right - 1

        dfs(root)
        return moves
