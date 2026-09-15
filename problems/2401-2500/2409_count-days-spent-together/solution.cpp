class Solution {
  public:
    int countDaysTogether(string arriveAlice, string leaveAlice, string arriveBob, string leaveBob) {
        // Month lengths of a non-leap year, turned into "days before month
        // m" so any "MM-DD" maps to one day-of-year integer.
        int monthStart[13] = {0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365};
        auto dayOfYear = [&](const string &date) {
            int month = stoi(date.substr(0, 2));
            int day = stoi(date.substr(3));
            return monthStart[month - 1] + day;
        };

        // Both stays are now integer intervals; the shared days are their
        // inclusive intersection, empty exactly when the bounds cross.
        int arrival = max(dayOfYear(arriveAlice), dayOfYear(arriveBob));
        int departure = min(dayOfYear(leaveAlice), dayOfYear(leaveBob));
        return max(0, departure - arrival + 1);
    }
};
