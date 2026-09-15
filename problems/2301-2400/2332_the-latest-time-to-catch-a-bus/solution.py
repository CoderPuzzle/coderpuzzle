from typing import List


class Solution:
    def latestTimeCatchTheBus(self, buses: List[int], passengers: List[int], capacity: int) -> int:
        buses.sort()
        passengers.sort()
        boarded = 0
        j = 0
        for bus in buses:
            boarded = 0
            while j < len(passengers) and boarded < capacity and passengers[j] <= bus:
                j += 1
                boarded += 1
        if boarded < capacity:
            answer = buses[-1]
        else:
            answer = passengers[j - 1] - 1
        taken = set(passengers)
        while answer in taken:
            answer -= 1
        return answer
