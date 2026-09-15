from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def allPossibleFBT(self, n: int) -> List[Optional[TreeNode]]:
        # A full tree's node count is odd: the root alone is 1, and every
        # internal node adds a pair. An even n therefore admits no tree.
        if n % 2 == 0:
            return []
        memo: List[List[Optional[TreeNode]]] = [[] for _ in range(n + 1)]
        memo[1] = [TreeNode()]

        def build(count: int) -> List[Optional[TreeNode]]:
            if memo[count]:
                return memo[count]
            # The root is fixed; a tree of `count` nodes is a choice of
            # left shape times right shape over every odd split of
            # count - 1 — left sizes ascending, left shapes outermost,
            # exactly the order the statement pins. Subtrees are shared,
            # not copied: emitting a tree links two memoized shapes.
            trees: List[Optional[TreeNode]] = []
            for left_count in range(1, count - 1, 2):
                for left in build(left_count):
                    for right in build(count - 1 - left_count):
                        trees.append(TreeNode(0, left, right))
            memo[count] = trees
            return trees

        # build recurses count -> count - 2 -> ... -> 1, so it nests at
        # most n // 2 + 1 frames deep — 11 at the constraint's n = 20.
        return build(n)
