from collections import defaultdict, deque
from typing import List


class Solution:
    def findAllPeople(self, n: int, meetings: List[List[int]], firstPerson: int) -> List[int]:
        meetings.sort(key=lambda meeting: meeting[2])
        knows = [False] * n
        knows[0] = knows[firstPerson] = True
        start = 0
        while start < len(meetings):
            end = start
            graph = defaultdict(list)
            while end < len(meetings) and meetings[end][2] == meetings[start][2]:
                x, y, _ = meetings[end]
                graph[x].append(y)
                graph[y].append(x)
                end += 1

            queue = deque(person for person in graph if knows[person])
            while queue:
                person = queue.popleft()
                for other in graph[person]:
                    if not knows[other]:
                        knows[other] = True
                        queue.append(other)
            start = end

        return [person for person, informed in enumerate(knows) if informed]
