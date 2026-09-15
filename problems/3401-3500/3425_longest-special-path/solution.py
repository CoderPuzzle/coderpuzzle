from typing import List, Optional


class Solution:
    def longestSpecialPath(self, edges: List[List[int]], nums: List[int]) -> List[int]:
        n = len(nums)
        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))

        best_len = 0
        best_nodes = 1  # a single node is always a valid special path
        path_nodes = []
        dist_path = []
        last = {}
        start_depth = 0
        last_restore = []
        start_restore = []

        # Events: (node, parent, depth, dist, is_exit)
        st = [(0, -1, 0, 0, 0)]
        while st:
            u, par, depth, d, is_exit = st.pop()
            if is_exit:
                path_nodes.pop()
                dist_path.pop()
                val = nums[u]
                prev_last = last_restore.pop()
                if prev_last >= 0:
                    last[val] = prev_last
                else:
                    last.pop(val, None)
                start_depth = start_restore.pop()
                continue
            # Enter node u.
            path_nodes.append(u)
            dist_path.append(d)
            val = nums[u]
            prev_last = last.get(val, -1)
            last_restore.append(prev_last)
            prev_start = start_depth
            start_restore.append(prev_start)
            if prev_last >= start_depth:
                start_depth = prev_last + 1
            last[val] = depth
            length = d - dist_path[start_depth]
            nodes = depth - start_depth + 1
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
