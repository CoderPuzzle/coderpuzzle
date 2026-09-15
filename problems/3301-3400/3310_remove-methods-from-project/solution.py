from typing import List


class Solution:
    def remainingMethods(self, n: int, k: int, invocations: List[List[int]]) -> List[int]:
        graph = [[] for _ in range(n)]
        for a, b in invocations:
            graph[a].append(b)
        # Iterative DFS from k: a 10^5-long invocation chain would overflow
        # the recursion stack under the judged limits.
        suspicious = [False] * n
        suspicious[k] = True
        stack = [k]
        while stack:
            node = stack.pop()
            for nxt in graph[node]:
                if not suspicious[nxt]:
                    suspicious[nxt] = True
                    stack.append(nxt)
        # The group may only be removed when no outside method invokes
        # into it; otherwise nothing is removed at all.
        for a, b in invocations:
            if not suspicious[a] and suspicious[b]:
                return list(range(n))
        return [node for node in range(n) if not suspicious[node]]
