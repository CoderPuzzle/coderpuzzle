from typing import List


class Solution:
    def isPreorder(self, nodes: List[List[int]]) -> bool:
        # Stack of ancestors whose subtrees are still open. Popping until the
        # parent surfaces closes every subtree finished since the last visit;
        # an empty stack before that means the parent is gone for good.
        stack: List[int] = []
        for i, (node_id, parent_id) in enumerate(nodes):
            if i == 0:
                if parent_id != -1:
                    return False
            else:
                while stack and stack[-1] != parent_id:
                    stack.pop()
                if not stack:
                    return False
            stack.append(node_id)
        return True
