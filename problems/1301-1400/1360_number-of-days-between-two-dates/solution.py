class Solution:
    def daysBetweenDates(self, date1: str, date2: str) -> int:
        # Day numbers from a fixed epoch; the answer is their difference.

        def is_leap(year: int) -> bool:
            return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

        month_lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        def day_number(date: str) -> int:
            year, month, day = (int(part) for part in date.split("-"))
            total = 0
            for y in range(1971, year):
                total += 366 if is_leap(y) else 365
            for m in range(1, month):
                total += month_lengths[m - 1]
                if m == 2 and is_leap(year):
                    total += 1
            return total + day - 1

        return abs(day_number(date1) - day_number(date2))
