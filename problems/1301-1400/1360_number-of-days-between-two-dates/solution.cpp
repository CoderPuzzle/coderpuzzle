class Solution {
  public:
    int daysBetweenDates(string date1, string date2) {
        // Day numbers from a fixed epoch; the answer is their difference.
        return abs(dayNumber(date1) - dayNumber(date2));
    }

  private:
    static int dayNumber(const string &date) {
        int year = stoi(date.substr(0, 4));
        int month = stoi(date.substr(5, 2));
        int day = stoi(date.substr(8, 2));
        static const int monthLengths[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        int total = 0;
        for (int y = 1971; y < year; ++y) {
            total += isLeap(y) ? 366 : 365;
        }
        for (int m = 1; m < month; ++m) {
            total += monthLengths[m - 1];
            if (m == 2 && isLeap(year)) {
                total += 1;
            }
        }
        return total + day - 1;
    }

    static bool isLeap(int year) { return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0); }
};
