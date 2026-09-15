class Solution:
    def numberOfDays(self, year: int, month: int) -> int:
        if month == 2:
            # Gregorian leap rule: div by 4, except centuries, except 400s.
            leap = year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)
            return 29 if leap else 28
        # April, June, September, November are the short months; the rest,
        # apart from February handled above, are all 31 days.
        return 30 if month in (4, 6, 9, 11) else 31
