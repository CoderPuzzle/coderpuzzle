from typing import List, Optional


class Solution:
    def replaceValueInTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # A node's new value is (sum of its level) - (its own original value
        # plus its sibling's). Two-phase breadth-first passes read a whole
        # level of children with their original values first — recording
        # where each parent's sibling group ends — then write the cousin
        # sums back group by group. Iterative on purpose: chains can run
        # 10^5 nodes deep, far past comfortable recursion.
        row = [root]
        root.val = 0
        while row:
            children: List[TreeNode] = []
            ends: List[int] = []
            child_sum = 0
            for node in row:
                for child in (node.left, node.right):
                    if child is not None:
                        children.append(child)
                        child_sum += child.val
                ends.append(len(children))
            index = 0
            for end in ends:
                if end > index:
                    pair_sum = 0
                    for k in range(index, end):
                        pair_sum += children[k].val
                    new_value = child_sum - pair_sum
                    for k in range(index, end):
                        children[k].val = new_value
                index = end
            row = children
        return root
