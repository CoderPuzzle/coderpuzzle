from collections import Counter, deque
from typing import List


class Solution:
    def watchedVideosByFriends(
        self, watchedVideos: List[List[str]], friends: List[List[int]], id: int, level: int
    ) -> List[str]:
        # BFS discovers nodes in increasing distance order, so the nodes whose
        # recorded distance equals `level` are exactly the level-k people.
        n = len(friends)
        dist = [None] * n
        dist[id] = 0
        queue = deque([id])
        counts = Counter()
        while queue:
            cur = queue.popleft()
            if dist[cur] == level:
                counts.update(watchedVideos[cur])
                continue
            for nxt in friends[cur]:
                if dist[nxt] is None:
                    dist[nxt] = dist[cur] + 1
                    queue.append(nxt)
        return [name for name, _ in sorted(counts.items(), key=lambda kv: (kv[1], kv[0]))]
