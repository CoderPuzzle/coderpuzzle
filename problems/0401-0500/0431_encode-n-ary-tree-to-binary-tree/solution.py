class Solution:
    def encode(self, root):
        if root is None:
            return None
        broot = TreeNode(root.val)
        queue = [(root, broot)]
        qi = 0
        while qi < len(queue):
            node, bnode = queue[qi]
            qi += 1
            prev = None
            for child in node.children:
                bchild = TreeNode(child.val)
                if prev is None:
                    bnode.left = bchild
                else:
                    prev.right = bchild
                prev = bchild
                queue.append((child, bchild))
        return broot
