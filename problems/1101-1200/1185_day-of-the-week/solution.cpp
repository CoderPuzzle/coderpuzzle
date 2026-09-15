class Solution {
  public:
    string dayOfTheWeek(int day, int month, int year) {
        // Anchored: Jan 1 1971 was a Friday, so offset 0 maps to Friday.
        const char *names[7] = {"Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"};
        static const int monthDays[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

        auto isLeap = [](int y) { return y % 4 == 0 && (y % 100 != 0 || y % 400 == 0); };

        long long days = 0;
        for (int y = 1971; y < year; y++) {
            days += isLeap(y) ? 366 : 365;
        }
        for (int m = 1; m < month; m++) {
            days += monthDays[m - 1];
            if (m == 2 && isLeap(year)) {
                days++;
            }
        }
        days += day - 1;
        return names[days % 7];
    }
};
