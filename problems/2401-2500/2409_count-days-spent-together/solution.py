class Solution:
    def countDaysTogether(
        self,
        arriveAlice: str,
        leaveAlice: str,
        arriveBob: str,
        leaveBob: str,
    ) -> int:
        # Month lengths of a non-leap year, turned into "days before month
        # m" so any "MM-DD" maps to one day-of-year integer.
        month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        month_start = [0] * 12
        for month in range(1, 12):
            month_start[month] = month_start[month - 1] + month_days[month - 1]

        def day_of_year(date: str) -> int:
            month = int(date[:2])
            day = int(date[3:])
            return month_start[month - 1] + day

        # Both stays are now integer intervals; the shared days are their
        # inclusive intersection, empty exactly when the bounds cross.
        arrival = max(day_of_year(arriveAlice), day_of_year(arriveBob))
        departure = min(day_of_year(leaveAlice), day_of_year(leaveBob))
        return max(0, departure - arrival + 1)
