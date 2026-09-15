MONTHS = {
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12",
}


class Solution:
    def reformatDate(self, date: str) -> str:
        day_str, month_str, year_str = date.split()
        # Every ordinal suffix (st/nd/rd/th) is exactly two letters, so
        # dropping the last two characters always leaves the bare digits.
        day = day_str[:-2]
        if len(day) == 1:
            day = "0" + day
        month = MONTHS[month_str]
        return f"{year_str}-{month}-{day}"
