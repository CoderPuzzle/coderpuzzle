from typing import Optional


class Solution:
    def moveSubTree(self, root: Optional[Node], p: Optional[Node], q: Optional[Node]) -> Optional[Node]:
        # Pass one records every node's parent in a registry keyed by value
        # (the values are unique; the root has no entry); pass two probes
        # p's subtree for q. The surgery is the same three edits either way
        # -- the registry is what answers the lookups.
        parent = {}
        stack = [root]
        while stack:
            node = stack.pop()
            for child in node.children:
                parent[child.val] = node
                stack.append(child)
        below = False
        probe = [p]
        while probe:
            node = probe.pop()
            if node is q:
                below = True
                break
            probe.extend(node.children)
        # p already hangs exactly where the move wants it: nothing to do.
        if any(child is p for child in q.children):
            return root
        if below:
            parent[q.val].children.remove(q)
            if p.val not in parent:  # p is the root: q takes over
                q.children.append(p)
                return q
            holder = parent[p.val]
            holder.children[holder.children.index(p)] = q
            q.children.append(p)
            return root
        parent[p.val].children.remove(p)
        q.children.append(p)
        return root
