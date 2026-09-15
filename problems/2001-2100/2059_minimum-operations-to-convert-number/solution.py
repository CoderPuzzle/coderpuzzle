from typing import List


class Solution:
    def minimumOperations(self, nums: List[int], start: int, goal: int) -> int:
        distance = [-1] * 1001
        distance[start] = 0
        queue = [start]
        head = 0
        while head < len(queue):
            value = queue[head]
            head += 1
            next_distance = distance[value] + 1
            for number in nums:
                for candidate in (value + number, value - number, value ^ number):
                    if candidate == goal:
                        return next_distance
                    if 0 <= candidate <= 1000 and distance[candidate] == -1:
                        distance[candidate] = next_distance
                        queue.append(candidate)
        return -1
