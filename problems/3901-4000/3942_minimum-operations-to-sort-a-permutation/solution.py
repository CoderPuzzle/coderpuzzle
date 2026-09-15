from collections import deque
from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        n = len(nums)
        position = nums.index(0)
        if all(nums[(position + i) % n] == i for i in range(n)):
            target = (0, position)
        else:
            reversed_nums = nums[::-1]
            reversed_position = reversed_nums.index(0)
            if not all(reversed_nums[(reversed_position + i) % n] == i for i in range(n)):
                return -1
            target = (1, reversed_position)

        queue = deque([(0, 0)])
        distance = {(0, 0): 0}
        while queue:
            kind, shift = queue.popleft()
            current_distance = distance[(kind, shift)]
            if (kind, shift) == target:
                return current_distance
            neighbors = [
                (kind, (shift + 1) % n),
                (1 - kind, (n - shift) % n),
            ]
            for neighbor in neighbors:
                if neighbor not in distance:
                    distance[neighbor] = current_distance + 1
                    queue.append(neighbor)
        return -1
