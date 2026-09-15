from typing import List, Optional


class Solution:
    def canMerge(self, trees: List[Optional[TreeNode]]) -> Optional[TreeNode]:
        # The final root is the unique root value that never appears as a
        # leaf of another tree; duplicate leaf values make merging impossible
        # outright, since a valid BST holds each value exactly once.
        leaf_seen = set()
        for root in trees:
            for child in (root.left, root.right):
                if child is not None:
                    if child.val in leaf_seen:
                        return None
                    leaf_seen.add(child.val)
        candidates = [r for r in trees if r.val not in leaf_seen]
        if len(candidates) != 1:
            return None
        root = candidates[0]

        # by_val maps every live node value to its node; splicing a tree in
        # registers the incoming nodes so later trees can chain onto them.
        # Each input tree has <= 3 nodes (children but no grandchildren), so
        # replacing one leaf's payload with a whole subtree is constant work.
        by_val = {}
        stack = [root]
        while stack:
            nd = stack.pop()
            by_val[nd.val] = nd
            if nd.left is not None:
                stack.append(nd.left)
            if nd.right is not None:
                stack.append(nd.right)

        pending = [t for t in trees if t is not root]
        while pending:
            rest = []
            progressed = False
            for tree in pending:
                host = by_val.get(tree.val)
                # A host must be a true leaf other than the final root: the
                # root's value cannot equal any pending tree's root value.
                if host is not None and host.left is None and host.right is None and host is not root:
                    host.left = tree.left
                    host.right = tree.right
                    sub = [tree]
                    while sub:
                        nd = sub.pop()
                        by_val[nd.val] = nd
                        if nd.left is not None:
                            sub.append(nd.left)
                        if nd.right is not None:
                            sub.append(nd.right)
                    progressed = True
                else:
                    rest.append(tree)
            if not progressed:
                return None
            pending = rest

        # Validate: strict in-order increase proves BST ordering and that
        # every value is distinct; the distinct-value count proves all n - 1
        # merges actually landed inside one connected tree. Iterative walk,
        # safe at n = 5*10^4.
        prev = None
        seen = set()
        stack2 = []
        cur = root
        while stack2 or cur is not None:
            while cur is not None:
                stack2.append(cur)
                cur = cur.left
            cur = stack2.pop()
            if prev is not None and cur.val <= prev:
                return None
            prev = cur.val
            seen.add(cur.val)
            cur = cur.right
        if len(seen) != len(by_val):
            return None
        return root
