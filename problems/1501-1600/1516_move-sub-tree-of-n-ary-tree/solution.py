from typing import Optional


class Solution:
    def moveSubTree(self, root: Optional[Node], p: Optional[Node], q: Optional[Node]) -> Optional[Node]:
        # One sweep gathers the facts the rewiring needs: p's parent, q's
        # parent, and whether q sits inside p's subtree -- depth counts how
        # many levels below p the walk currently is (0 means outside).
        p_parent = q_parent = None
        q_below = False
        stack = [(root, None, 0)]
        while stack:
            node, parent, depth = stack.pop()
            if node is p:
                p_parent = parent
            if node is q:
                q_parent = parent
                q_below = depth > 0
            nxt = depth + 1 if (depth or node is p) else 0
            for child in node.children:
                stack.append((child, node, nxt))
        # p already hangs exactly where the move wants it: nothing to do.
        if any(child is p for child in q.children):
            return root
        if q_below:
            # Case 1: q travels inside p's subtree, so free q and re-hang it
            # where p stood -- in p's parent's children list, or at the root
            # when p is the root -- before p becomes q's last child.
            q_parent.children.remove(q)
            if p_parent is None:
                q.children.append(p)
                return q
            p_parent.children[p_parent.children.index(p)] = q
            q.children.append(p)
            return root
        # Cases 2 and 3: a plain re-attachment of p (with its subtree).
        p_parent.children.remove(p)
        q.children.append(p)
        return root
