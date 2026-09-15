class Solution:
    def serialize(self, root):
        if root is None:
            return "[]"
        tokens = [str(root.val), "null"]
        queue = [root]
        qi = 0
        while qi < len(queue):
            node = queue[qi]
            qi += 1
            for child in node.children:
                tokens.append(str(child.val))
                queue.append(child)
            tokens.append("null")
        while tokens and tokens[-1] == "null":
            tokens.pop()
        return "[" + ",".join(tokens) + "]"
