from typing import List


class Solution:
    def longestSpecialPath(self, edges: List[List[int]], nums: List[int]) -> List[int]:
        n = len(nums)
        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))

        best_len = 0
        best_nodes = 1  # a single node is always a valid special path
        dist_path = []  # dist_path[i] = distance from the root to the node at depth i
        last = {}  # value -> depth of its last occurrence on the path
        # Window starts over the current root-to-node path: `top` keeps every
        # value distinct, `second` additionally tolerates one repeated value.
        top = 0
        second = 0
        last_restore = []
        top_restore = []
        second_restore = []

        # Events: (node, parent, depth, dist, is_exit)
        st = [(0, -1, 0, 0, 0)]
        while st:
            u, par, depth, d, is_exit = st.pop()
            if is_exit:
                dist_path.pop()
                val = nums[u]
                prev_last = last_restore.pop()
                if prev_last >= 0:
                    last[val] = prev_last
                else:
                    last.pop(val, None)
                top = top_restore.pop()
                second = second_restore.pop()
                continue
            # Enter node u.
            dist_path.append(d)
            val = nums[u]
            prev_last = last.get(val, -1)
            last_restore.append(prev_last)
            top_restore.append(top)
            second_restore.append(second)
            if prev_last >= top:
                # The repeat enters the all-distinct window: that window can
                # still serve as the one-repeat window.
                second = top
                top = prev_last + 1
            elif prev_last >= second:
                second = prev_last + 1
            last[val] = depth
            length = d - dist_path[second]
            nodes = depth - second + 1
            if length > best_len:
                best_len = length
                best_nodes = nodes
            elif length == best_len and nodes < best_nodes:
                best_nodes = nodes
            st.append((u, par, depth, d, 1))
            for v, w in adj[u]:
                if v != par:
                    st.append((v, u, depth + 1, d + w, 0))
        return [best_len, best_nodes]
