from collections import defaultdict
from typing import List


class Solution:
    def averageHeightOfBuildings(self, buildings: List[List[int]]) -> List[List[int]]:
        events = defaultdict(lambda: [0, 0])
        for start, end, height in buildings:
            events[start][0] += height
            events[start][1] += 1
            events[end][0] -= height
            events[end][1] -= 1

        coordinates = sorted(events)
        height_sum = 0
        count = 0
        street = []
        for index in range(len(coordinates) - 1):
            left = coordinates[index]
            height_sum += events[left][0]
            count += events[left][1]
            right = coordinates[index + 1]
            if count == 0:
                continue
            average = height_sum // count
            if street and street[-1][1] == left and street[-1][2] == average:
                street[-1][1] = right
            else:
                street.append([left, right, average])
        return street
