import datetime


class Solution:
    def nextDay(self, date: str) -> str:
        # The engine owns the calendar: stepping a parsed date by one
        # timedelta day renormalizes month lengths, leap years, and the year
        # boundary, and isoformat() renders the result already zero-padded
        # as "YYYY-MM-DD".
        step = datetime.date.fromisoformat(date) + datetime.timedelta(days=1)
        return step.isoformat()
