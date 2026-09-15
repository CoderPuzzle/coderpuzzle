from typing import List


class Solution:
    def maxTwoEvents(self, events: List[List[int]]) -> int:
        events.sort(key=lambda event: event[0])
        suffix_maximum = [0] * (len(events) + 1)
        for index in range(len(events) - 1, -1, -1):
            suffix_maximum[index] = max(events[index][2], suffix_maximum[index + 1])

        answer = 0
        for start, end, value in events:
            low, high = 0, len(events)
            while low < high:
                middle = (low + high) // 2
                if events[middle][0] <= end:
                    low = middle + 1
                else:
                    high = middle
            answer = max(answer, value + suffix_maximum[low])

        return answer
