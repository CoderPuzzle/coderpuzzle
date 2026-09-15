from typing import List, Optional


class Solution:
    def treeQueries(self, root: Optional[TreeNode], queries: List[int]) -> List[int]:
        if root is None:
            return [0] * len(queries)

        depth = {}
        height = {}
        submax = {}

        # iterative pre-order for depth + post-order for height/submax
        order = []
        stack = [root]
        depth[root.val] = 0
        while stack:
            u = stack.pop()
            order.append(u)
            if u.left:
                depth[u.left.val] = depth[u.val] + 1
                stack.append(u.left)
            if u.right:
                depth[u.right.val] = depth[u.val] + 1
                stack.append(u.right)

        for u in reversed(order):
            h = 0
            if u.left:
                h = max(h, 1 + height[u.left.val])
            if u.right:
                h = max(h, 1 + height[u.right.val])
            height[u.val] = h
            sm = depth[u.val] + h
            if u.left:
                sm = max(sm, submax[u.left.val])
            if u.right:
                sm = max(sm, submax[u.right.val])
            submax[u.val] = sm

        ans = {}
        stack = [(root, -1)]
        while stack:
            u, mx = stack.pop()
            ans[u.val] = mx
            left, right = u.left, u.right
            if left:
                h_without_left = (1 + height[right.val]) if right else 0
                new_mx = mx
                if depth[u.val] + h_without_left > new_mx:
                    new_mx = depth[u.val] + h_without_left
                if right and submax[right.val] > new_mx:
                    new_mx = submax[right.val]
                stack.append((left, new_mx))
            if right:
                h_without_right = (1 + height[left.val]) if left else 0
                new_mx = mx
                if depth[u.val] + h_without_right > new_mx:
                    new_mx = depth[u.val] + h_without_right
                if left and submax[left.val] > new_mx:
                    new_mx = submax[left.val]
                stack.append((right, new_mx))

        return [ans[q] for q in queries]
