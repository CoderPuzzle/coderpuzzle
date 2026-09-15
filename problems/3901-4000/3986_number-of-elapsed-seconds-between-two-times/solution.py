class Solution:
    def secondsBetweenTimes(self, startTime: str, endTime: str) -> int:
        def seconds(value: str) -> int:
            hours = int(value[0:2])
            minutes = int(value[3:5])
            seconds = int(value[6:8])
            return hours * 3600 + minutes * 60 + seconds

        return seconds(endTime) - seconds(startTime)
