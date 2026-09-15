from typing import List, Optional


class Solution:
    def closestNodes(self, root: Optional[TreeNode], queries: List[int]) -> List[List[int]]:
        # A BST's inorder traversal is sorted: flatten once and each
        # query becomes two binary searches; the iterative walk dodges
        # recursion depth on a skewed tree.
        values = []
        stack = []
        current = root
        while current or stack:
            while current:
                stack.append(current)
                current = current.left
            current = stack.pop()
            values.append(current.val)
            current = current.right

        import bisect

        answer = []
        for query in queries:
            # bisect_right sits one past the last value <= query, so
            # upper-1 is the largest such value (-1 if all exceed it).
            upper = bisect.bisect_right(values, query)
            minimum = values[upper - 1] if upper > 0 else -1
            # bisect_left is the first value >= query; past the end means
            # none. A present query converges both to [q, q].
            lower = bisect.bisect_left(values, query)
            maximum = values[lower] if lower < len(values) else -1
            answer.append([minimum, maximum])
        return answer
