from typing import List


class Solution:
    def finishTime(self, n: int, edges: List[List[int]], baseTime: List[int]) -> int:
        children = [[] for _ in range(n)]
        for parent, child in edges:
            children[parent].append(child)

        finish = [0] * n
        for node in range(n - 1, -1, -1):
            if not children[node]:
                finish[node] = baseTime[node]
                continue
            earliest = min(finish[child] for child in children[node])
            latest = max(finish[child] for child in children[node])
            own_duration = latest - earliest + baseTime[node]
            finish[node] = latest + own_duration
        return finish[0]
