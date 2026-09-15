from typing import Optional


class Codec:
    """Preorder walk with explicit null markers: the root's value, then its
    left subtree, then its right, every absent child written as `x`, and
    the pieces joined by commas — `2,1,x,x,3,x,x` for [2,1,3], `x` for the
    empty tree.
    """

    def serialize(self, root: Optional[TreeNode]) -> str:
        out = []
        stack = [root]
        while stack:
            node = stack.pop()
            if node is None:
                out.append("x")
                continue
            out.append(str(node.val))
            stack.append(node.right)
            stack.append(node.left)
        return ",".join(out)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        tokens = data.split(",")
        if tokens[0] == "x":
            return None
        root = TreeNode(int(tokens[0]))
        stack = [[root, 0]]
        for token in tokens[1:]:
            node, side = stack.pop()
            child = None if token == "x" else TreeNode(int(token))
            if side == 0:
                node.left = child
                stack.append([node, 1])
            else:
                node.right = child
            if child is not None:
                stack.append([child, 0])
        return root
