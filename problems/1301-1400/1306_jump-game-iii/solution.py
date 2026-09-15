from collections import deque
from typing import List


class Solution:
    def canReach(self, arr: List[int], start: int) -> bool:
        # BFS over indexes: from i, the only successors are i +/- arr[i].
        # Each index is visited once, so cycles cannot loop forever and a
        # skewed chain of 5*10^4 indexes never touches the recursion stack.
        n = len(arr)
        visited = [False] * n
        queue = deque([start])
        visited[start] = True
        while queue:
            i = queue.popleft()
            if arr[i] == 0:
                return True
            for nxt in (i + arr[i], i - arr[i]):
                if 0 <= nxt < n and not visited[nxt]:
                    visited[nxt] = True
                    queue.append(nxt)
        return False
