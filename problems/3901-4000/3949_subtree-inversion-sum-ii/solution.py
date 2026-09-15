from array import array
from typing import List


class Solution:
    def subtreeInversionSum(self, edges: List[List[int]], nums: List[int], k: int) -> int:
        n = len(nums)
        graph = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)
        parent = [-1] * n
        order = [0]
        for node in order:
            for neighbor in graph[node]:
                if neighbor != parent[node]:
                    parent[neighbor] = node
                    order.append(neighbor)
        width = k + 1
        neg_inf, pos_inf = -(10**18), 10**18
        maximum = array("q", [neg_inf]) * (n * width)
        minimum = array("q", [pos_inf]) * (n * width)
        for node in reversed(order):
            cur_max = [neg_inf] * width
            cur_min = [pos_inf] * width
            cur_max[k] = cur_min[k] = nums[node]
            selected_max = selected_min = -nums[node]
            for child in graph[node]:
                if parent[child] != node:
                    continue
                offset = child * width
                allowed_max = max(maximum[offset + distance] for distance in range(k - 1, k + 1))
                allowed_min = min(minimum[offset + distance] for distance in range(k - 1, k + 1))
                selected_max -= allowed_min
                selected_min -= allowed_max
                child_max = [neg_inf] * width
                child_min = [pos_inf] * width
                for distance in range(k):
                    child_max[distance + 1] = maximum[offset + distance]
                    child_min[distance + 1] = minimum[offset + distance]
                child_max[k] = max(child_max[k], maximum[offset + k])
                child_min[k] = min(child_min[k], minimum[offset + k])
                suffix_child_max = child_max[:]
                suffix_child_min = child_min[:]
                suffix_cur_max = cur_max[:]
                suffix_cur_min = cur_min[:]
                for distance in range(k - 1, -1, -1):
                    suffix_child_max[distance] = max(suffix_child_max[distance], suffix_child_max[distance + 1])
                    suffix_child_min[distance] = min(suffix_child_min[distance], suffix_child_min[distance + 1])
                    suffix_cur_max[distance] = max(suffix_cur_max[distance], suffix_cur_max[distance + 1])
                    suffix_cur_min[distance] = min(suffix_cur_min[distance], suffix_cur_min[distance + 1])
                new_max = [neg_inf] * width
                new_min = [pos_inf] * width
                new_max[k] = cur_max[k] + child_max[k]
                new_min[k] = cur_min[k] + child_min[k]
                for distance in range(1, k):
                    threshold = max(distance, k - distance)
                    new_max[distance] = max(
                        cur_max[distance] + suffix_child_max[threshold],
                        child_max[distance] + suffix_cur_max[threshold],
                    )
                    new_min[distance] = min(
                        cur_min[distance] + suffix_child_min[threshold],
                        child_min[distance] + suffix_cur_min[threshold],
                    )
                cur_max, cur_min = new_max, new_min
            cur_max[0], cur_min[0] = selected_max, selected_min
            offset = node * width
            for distance in range(width):
                maximum[offset + distance] = cur_max[distance]
                minimum[offset + distance] = cur_min[distance]
        return max(maximum[:width])
