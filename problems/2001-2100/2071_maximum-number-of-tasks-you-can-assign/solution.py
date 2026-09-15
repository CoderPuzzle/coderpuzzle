from collections import deque
from typing import List


class Solution:
    def maxTaskAssign(self, tasks: List[int], workers: List[int], pills: int, strength: int) -> int:
        tasks.sort()
        workers.sort()

        def feasible(count: int) -> bool:
            available = deque()
            task_index = 0
            pills_left = pills
            for worker in workers[len(workers) - count :]:
                while task_index < count and tasks[task_index] <= worker + strength:
                    available.append(tasks[task_index])
                    task_index += 1
                if not available:
                    return False
                if available[0] <= worker:
                    available.popleft()
                else:
                    if pills_left == 0:
                        return False
                    pills_left -= 1
                    available.pop()
            return True

        low, high = 0, min(len(tasks), len(workers)) + 1
        while low + 1 < high:
            middle = (low + high) // 2
            if feasible(middle):
                low = middle
            else:
                high = middle
        return low
