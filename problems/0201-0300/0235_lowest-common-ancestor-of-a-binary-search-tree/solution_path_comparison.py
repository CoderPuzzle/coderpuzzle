class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: int, q: int) -> int:
        def path_to(target: int) -> list[int]:
            # The ordering walks a target home in a straight line: every
            # node recorded is a strict ancestor-or-self of the target.
            path = []
            node = root
            while node.val != target:
                path.append(node.val)
                node = node.left if target < node.val else node.right
            path.append(target)
            return path

        # Two written-down paths instead of one simultaneous descent.
        first = path_to(p)
        second = path_to(q)
        # Shared entries are exactly the shared ancestors; read both lists
        # in lockstep until they split (or one ends, when one target sits
        # above the other) and report the last value they agreed on.
        answer = first[0]
        for a, b in zip(first, second):
            if a != b:
                break
            answer = a
        return answer
