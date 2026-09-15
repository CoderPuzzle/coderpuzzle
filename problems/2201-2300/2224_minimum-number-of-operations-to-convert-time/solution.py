class Solution:
    def convertTime(self, current: str, correct: str) -> int:
        def to_minutes(time: str) -> int:
            return int(time[:2]) * 60 + int(time[3:])

        diff = to_minutes(correct) - to_minutes(current)
        operations = 0
        for step in (60, 15, 5, 1):
            operations += diff // step
            diff %= step
        return operations
