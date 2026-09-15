class Solution:
    def copyRandomBinaryTree(self, root):
        if root is None:
            return None
        # Weave: every original node's left slot comes to hold its own clone,
        # and the clone's left holds the original's former left child, so the
        # original structure stays walkable one step down.
        stack = [root]
        while stack:
            node = stack.pop()
            clone = RandomTreeNode(node.val)
            left = node.left
            clone.left = left
            node.left = clone
            if left is not None:
                stack.append(left)
            if node.right is not None:
                stack.append(node.right)
        # Far links: an original's clone is node.left, so the clone of
        # anything the original points across to — its random target and
        # its right child — is that target's own left.
        stack = [root]
        while stack:
            node = stack.pop()
            clone = node.left
            if node.random is not None:
                clone.random = node.random.left
            right = node.right
            if right is not None:
                clone.right = right.left
                stack.append(right)
            if clone.left is not None:
                stack.append(clone.left)
        answer = root.left
        # Split: restore each original's left child and hand the clone the
        # clone of that subtree.
        stack = [root]
        while stack:
            node = stack.pop()
            clone = node.left
            left = clone.left
            clone.left = left.left if left is not None else None
            node.left = left
            if left is not None:
                stack.append(left)
            if node.right is not None:
                stack.append(node.right)
        return answer
