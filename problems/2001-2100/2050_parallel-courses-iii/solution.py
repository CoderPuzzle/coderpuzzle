from typing import List
from collections import deque


class Solution:
    def minimumTime(self, n: int, relations: List[List[int]], time: List[int]) -> int:
        adjacency = [[] for _ in range(n + 1)]
        indegree = [0] * (n + 1)
        for prev, nxt in relations:
            adjacency[prev].append(nxt)
            indegree[nxt] += 1
        # finish[i] = earliest month at which course i completes.
        finish = [0] * (n + 1)
        # Longest weighted chain on the prerequisite DAG: with unlimited
        # parallelism a course finishes at its duration plus the latest
        # prerequisite finish. Kahn's order makes every prerequisite final
        # before a course is processed.
        queue = deque(i for i in range(1, n + 1) if indegree[i] == 0)
        for i in queue:
            finish[i] = time[i - 1]
        while queue:
            course = queue.popleft()
            for nxt in adjacency[course]:
                # Relax with a max: the successor waits for ALL of its
                # prerequisites, not just the first to finish.
                if finish[course] + time[nxt - 1] > finish[nxt]:
                    finish[nxt] = finish[course] + time[nxt - 1]
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    queue.append(nxt)
        # Finishing everything means finishing the latest-ending chain.
        return max(finish[1 : n + 1])
