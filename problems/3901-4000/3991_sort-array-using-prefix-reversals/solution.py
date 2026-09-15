from collections import deque
from typing import List


class Solution:
    def sortArray(self, nums: List[int], pre: List[int]) -> int:
        start = tuple(nums)
        target = tuple(sorted(nums))
        if start == target:
            return 0
        queue = deque([start])
        distance = {start: 0}
        while queue:
            state = queue.popleft()
            current = distance[state]
            for length in pre:
                reversed_prefix = state[:length][::-1]
                next_state = reversed_prefix + state[length:]
                if next_state == target:
                    return current + 1
                if next_state not in distance:
                    distance[next_state] = current + 1
                    queue.append(next_state)
        return -1
