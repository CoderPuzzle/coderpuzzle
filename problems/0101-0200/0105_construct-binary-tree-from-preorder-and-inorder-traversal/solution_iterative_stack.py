class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def buildTree(self, preorder: list[int], inorder: list[int]) -> TreeNode | None:
        if not preorder:
            return None
        root = TreeNode(preorder[0])
        # The spine: every node whose left side is (possibly still) growing
        # and whose right child is still pending. Preorder's next value is
        # either the spine top's left child, or the right child of whatever
        # portion of the spine inorder has already finished.
        spine = [root]
        cursor = 0  # next inorder entry awaiting its turn
        for value in preorder[1:]:
            if spine[-1].val != inorder[cursor]:
                # The top is not due yet, so the value keeps descending left.
                node = TreeNode(value)
                spine[-1].left = node
                spine.append(node)
            else:
                # The top is due in inorder: its whole left side is settled,
                # so pop it (and any ancestors also due) -- the new value is
                # the right child of the deepest node popped.
                last = spine.pop()
                cursor += 1
                while spine and spine[-1].val == inorder[cursor]:
                    last = spine.pop()
                    cursor += 1
                node = TreeNode(value)
                last.right = node
                spine.append(node)
        return root
