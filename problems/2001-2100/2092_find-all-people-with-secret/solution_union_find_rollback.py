from typing import List


class Solution:
    def findAllPeople(self, n: int, meetings: List[List[int]], firstPerson: int) -> List[int]:
        parent = list(range(n))

        # Path-halving: splice every other node directly under its
        # grandparent, flattening the tree while walking to the root.
        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        # Moment 0: person 0 hands the whisper to firstPerson, so the two
        # share a component while everybody else is still a singleton.
        parent[0] = firstPerson
        meetings.sort(key=lambda meeting: meeting[2])
        start = 0
        while start < len(meetings):
            end = start
            while end < len(meetings) and meetings[end][2] == meetings[start][2]:
                ra, rb = find(meetings[end][0]), find(meetings[end][1])
                if ra != rb:
                    parent[ra] = rb
                end += 1

            # Roll back every attendee this moment left uninformed: their
            # merges must not leak the whisper into a later moment.
            root = find(0)
            for index in range(start, end):
                x, y = meetings[index][0], meetings[index][1]
                if find(x) != root:
                    parent[x] = x
                if find(y) != root:
                    parent[y] = y
            start = end

        root = find(0)
        return [person for person in range(n) if find(person) == root]
