class Solution:
    def nextDay(self, date: str) -> str:
        # Hand-rolled: parse the three fields, step the day-of-month, and
        # roll over through a days-in-month table — February widened to 29
        # on leap years (divisible by 4, except centuries unless divisible
        # by 400), December's overflow carrying into the next year. The
        # format spec zero-pads month and day to two digits and the year to
        # four, so the result is exactly "YYYY-MM-DD".
        year = int(date[0:4])
        month = int(date[5:7])
        day = int(date[8:10])
        is_leap = (year % 4 == 0 and year % 100 != 0) or year % 400 == 0
        month_lengths = [31, 29 if is_leap else 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        next_year, next_month, next_day = year, month, day + 1
        if next_day > month_lengths[next_month - 1]:
            next_day = 1
            next_month += 1
            if next_month > 12:
                next_month = 1
                next_year += 1
        return f"{next_year:04d}-{next_month:02d}-{next_day:02d}"
