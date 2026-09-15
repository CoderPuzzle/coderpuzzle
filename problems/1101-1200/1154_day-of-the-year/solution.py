class Solution:
    def dayOfYear(self, date: str) -> int:
        year = int(date[0:4])
        month = int(date[5:7])
        day = int(date[8:10])
        days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        # Gregorian leap rule: div by 4, except centuries, except 400.
        leap = year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)
        if leap:
            days[1] = 29
        return day + sum(days[: month - 1])
