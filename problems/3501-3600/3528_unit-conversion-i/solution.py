from collections import deque
from typing import List


class Solution:
    def baseUnitConversions(self, conversions: List[List[int]]) -> List[int]:
        # The conversions form a directed tree rooted at unit 0, so one BFS
        # fixes every answer: a child costs `factor` units per unit of its
        # parent, so its value is the parent's value times the factor. A
        # product reaches (10^9 + 6) * 10^9 ~ 10^18, which Python ints take
        # exactly; the mod is applied as we go. The explicit queue keeps the
        # walk iterative — a 10^5 chain would blow any recursion limit.
        MOD = 10**9 + 7
        n = len(conversions) + 1
        children = [[] for _ in range(n)]
        for source, target, factor in conversions:
            children[source].append((target, factor))
        result = [0] * n
        result[0] = 1
        queue = deque([0])
        while queue:
            node = queue.popleft()
            for target, factor in children[node]:
                result[target] = result[node] * factor % MOD
                queue.append(target)
        return result
