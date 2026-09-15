from math import gcd
from typing import List


class Solution:
    def getCoprimes(self, nums: List[int], edges: List[List[int]]) -> List[int]:
        # Values only reach 50, so track ancestors per value: on the current
        # root path, stacks[v] holds the nodes carrying value v, deepest
        # last. A node's answer is the deepest stack top among the values
        # coprime with its own.
        n = len(nums)
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        coprimes = [[w for w in range(1, 51) if gcd(v, w) == 1] for v in range(51)]

        ans = [-1] * n
        depth = [0] * n
        stacks = [[] for _ in range(51)]
        # The tree can be one 10**5-deep chain, so the traversal is
        # iterative: enter frames answer a node against the current stacks
        # and push it onto its value's stack, exit frames pop it again.
        stack = [(0, -1, False)]
        while stack:
            node, parent, leaving = stack.pop()
            if leaving:
                stacks[nums[node]].pop()
                continue
            best = -1
            best_depth = -1
            for w in coprimes[nums[node]]:
                candidates = stacks[w]
                if candidates:
                    top = candidates[-1]
                    if depth[top] > best_depth:
                        best = top
                        best_depth = depth[top]
            ans[node] = best
            stacks[nums[node]].append(node)
            stack.append((node, parent, True))
            for y in adj[node]:
                if y != parent:
                    depth[y] = depth[node] + 1
                    stack.append((y, node, False))
        return ans
