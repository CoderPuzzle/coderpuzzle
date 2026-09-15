class Solution:
    def deserialize(self, s):
        if s[0] != "[":
            leaf = NestedInteger()
            leaf.setInteger(int(s))
            return leaf
        stack = [NestedInteger()]
        root = None
        index = 1
        while index < len(s):
            ch = s[index]
            if ch == "[":
                stack.append(NestedInteger())
                index += 1
            elif ch == "]":
                node = stack.pop()
                if stack:
                    stack[-1].add(node)
                else:
                    root = node
                index += 1
            elif ch == ",":
                index += 1
            else:
                start = index
                while s[index] not in ",]":
                    index += 1
                leaf = NestedInteger()
                leaf.setInteger(int(s[start:index]))
                stack[-1].add(leaf)
        return root
