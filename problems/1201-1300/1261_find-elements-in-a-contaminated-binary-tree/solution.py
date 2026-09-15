# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


class FindElements:
    """Recover only the root; decide membership from the bit path.

    With w = value + 1, stepping left doubles w (append bit 0) and
    stepping right doubles w and adds one (append bit 1), so the bits of
    target + 1 after the leading one, read highest-first, are the
    root-to-target moves.
    """

    def __init__(self, root: Optional[TreeNode]):
        # Every stored value is -1; the recovered value of the root is 0.
        root.val = 0
        self.root = root

    def find(self, target: int) -> bool:
        bits = bin(target + 1)[3:]
        node = self.root
        for bit in bits:
            node = node.right if bit == "1" else node.left
            if node is None:
                return False
        return True


# Your FindElements object will be instantiated and called as such:
# obj = FindElements(root)
# param_1 = obj.find(target)
