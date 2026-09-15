from typing import List


class Solution:
    def maxRatings(self, units: List[List[int]]) -> int:
        if len(units[0]) == 1:
            return sum(device[0] for device in units)

        global_minimum = 10**9
        smallest_second = 10**9
        second_sum = 0
        for device in units:
            first = second = 10**9
            for capacity in device:
                if capacity < first:
                    first, second = capacity, first
                elif capacity < second:
                    second = capacity
            global_minimum = min(global_minimum, first)
            smallest_second = min(smallest_second, second)
            second_sum += second
        return second_sum - smallest_second + global_minimum
