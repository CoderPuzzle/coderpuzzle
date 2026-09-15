from typing import List, Optional


class Solution:
    def generateTrees(self, n: int) -> List[Optional[TreeNode]]:
        def build(lo: int, hi: int) -> List[Optional[TreeNode]]:
            # An empty range still offers one choice: the null subtree.
            if lo > hi:
                return [None]
            trees: List[Optional[TreeNode]] = []
            for root in range(lo, hi + 1):
                # Left choices vary slower than right choices, so the loop
                # nesting emits the trees in the order the statement pins.
                for left in build(lo, root - 1):
                    for right in build(root + 1, hi):
                        trees.append(TreeNode(root, left, right))
            return trees

        return build(1, n)
