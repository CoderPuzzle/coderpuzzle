class Solution:
    def inorderSuccessor(self, tree, node):
        target = None
        stack = [tree] if tree is not None else []
        while stack and target is None:
            current = stack.pop()
            if current.val == node:
                target = current
            for child in (current.left, current.right):
                if child is not None:
                    stack.append(child)
        if target is None:
            return None
        if target.right is not None:
            successor = target.right
            while successor.left is not None:
                successor = successor.left
            return successor
        while target.parent is not None and target.parent.left is not target:
            target = target.parent
        return target.parent
