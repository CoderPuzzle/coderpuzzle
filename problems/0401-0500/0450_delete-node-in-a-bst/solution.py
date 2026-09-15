from typing import List, Optional


class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        def delete(node, key):
            if not node:
                return None
            if key < node.val:
                # Descend by BST order, rewriting the child link so the tree
                # relinks itself on the way back up.
                node.left = delete(node.left, key)
            elif key > node.val:
                node.right = delete(node.right, key)
            else:
                # One-child (and leaf) cases: lift the whole remaining
                # subtree — it stays on the same side of every ancestor.
                if not node.left:
                    return node.right
                if not node.right:
                    return node.left
                # Two children: adopt the in-order successor's value (minimum
                # of the right subtree). It exceeds everything on the left
                # and is minimal in the right, so the ordering is preserved.
                successor = node.right
                while successor.left:
                    successor = successor.left
                node.val = successor.val
                # Delete the duplicate successor; that recursive call lands
                # on a node with no left child, i.e. an easy splice.
                node.right = delete(node.right, successor.val)
            return node

        return delete(root, key)
