from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def maxSum(self, root: Optional[TreeNode]) -> int:
        # Parent pointers let the DFS move up as well as down. Trying every
        # node as a path start, the search only enters a neighbor whose value
        # is not already on the current path — the seen set alone blocks the
        # way back to the parent, since the parent is always on the path.
        # Iterative with enter/exit markers, so a 1000-node chain cannot blow
        # a recursion budget.
        parent = {root: None}
        nodes = []
        stack = [root]
        while stack:
            node = stack.pop()
            nodes.append(node)
            if node.left is not None:
                parent[node.left] = node
                stack.append(node.left)
            if node.right is not None:
                parent[node.right] = node
                stack.append(node.right)
        best = -(10**9)
        for start in nodes:
            seen = set()
            st = [(start, start.val, 0)]  # phase 0 enter, 1 exit
            while st:
                node, s, phase = st.pop()
                if phase == 1:
                    seen.remove(node.val)
                    continue
                seen.add(node.val)
                if s > best:
                    best = s
                st.append((node, s, 1))
                for nxt in (node.left, node.right, parent[node]):
                    if nxt is not None and nxt.val not in seen:
                        st.append((nxt, s + nxt.val, 0))
        return best
