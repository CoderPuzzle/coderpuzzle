class Solution:
    def maximumDetonation(self, bombs: list[list[int]]) -> int:
        count = len(bombs)
        graph = [[] for _ in range(count)]
        for source, (x1, y1, radius) in enumerate(bombs):
            for target, (x2, y2, _) in enumerate(bombs):
                if (x1 - x2) ** 2 + (y1 - y2) ** 2 <= radius**2:
                    graph[source].append(target)

        answer = 0
        for start in range(count):
            seen = {start}
            stack = [start]
            while stack:
                source = stack.pop()
                for target in graph[source]:
                    if target not in seen:
                        seen.add(target)
                        stack.append(target)
            answer = max(answer, len(seen))
        return answer
