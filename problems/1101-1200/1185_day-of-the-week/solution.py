class Solution:
    def dayOfTheWeek(self, day: int, month: int, year: int) -> str:
        # Anchored: Jan 1 1971 was a Friday, so offset 0 maps to Friday.
        names = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
        month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        def is_leap(y: int) -> bool:
            return y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)

        days = 0
        for y in range(1971, year):
            days += 366 if is_leap(y) else 365
        for m in range(1, month):
            days += month_days[m - 1]
            if m == 2 and is_leap(year):
                days += 1
        days += day - 1
        return names[days % 7]
