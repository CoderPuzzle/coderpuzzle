from typing import List


class Solution:
    def weightedSum(self, parent: List[int], nums: List[int]) -> int:
        n = len(parent)
        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[parent[i]].append(i)

        depth = [0] * n
        depth[0] = 1
        queue = [0]
        head = 0
        while head < len(queue):
            node = queue[head]
            head += 1
            for child in children[node]:
                depth[child] = depth[node] + 1
                queue.append(child)

        height = max(depth)

        total = 0
        for i in range(n):
            total += nums[i] * (height - depth[i] + 1)
        return total
