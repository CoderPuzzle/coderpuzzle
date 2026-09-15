class Solution:
    def countDays(self, days: int, meetings: List[List[int]]) -> int:
        meetings.sort()
        free = 0
        last_end = 0
        for start, end in meetings:
            if start > last_end:
                free += start - last_end - 1
            if end > last_end:
                last_end = end
        free += days - last_end
        return free
