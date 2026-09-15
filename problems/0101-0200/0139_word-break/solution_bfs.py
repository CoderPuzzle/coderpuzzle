from typing import List, Optional

from collections import deque


class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        words = set(wordDict)
        n = len(s)
        # Only words short enough to fit can ever be a next piece.
        max_len = max(map(len, wordDict))
        # BFS over start indices: start positions reachable by segmenting a
        # prefix of s. visited keeps each index enqueued at most once.
        visited = [False] * (n + 1)
        visited[0] = True
        queue = deque([0])
        while queue:
            i = queue.popleft()
            # Try every dictionary word as the next piece s[i:i+L].
            for length in range(1, min(max_len, n - i) + 1):
                if s[i : i + length] in words:
                    end = i + length
                    # Reaching the far end means the whole string segments.
                    if end == n:
                        return True
                    if not visited[end]:
                        visited[end] = True
                        queue.append(end)
        # No reachable start ever crossed the finish line.
        return False
