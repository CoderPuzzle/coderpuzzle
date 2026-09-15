#include <cstdio>
#include <string>

class Solution {
  public:
    std::string nextDay(std::string date) {
        // Hand-rolled: parse the three fields, step the day-of-month, and
        // roll over through a days-in-month table — February widened to 29
        // on leap years (divisible by 4, except centuries unless divisible
        // by 400), December's overflow carrying into the next year.
        // snprintf zero-pads month and day to two digits and the year to
        // four, so the result is exactly "YYYY-MM-DD".
        const int year = std::stoi(date.substr(0, 4));
        const int month = std::stoi(date.substr(5, 2));
        const int day = std::stoi(date.substr(8, 2));
        const bool leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
        const int monthLengths[] = {31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        int nextYear = year;
        int nextMonth = month;
        int nextDayOfMonth = day + 1;
        if (nextDayOfMonth > monthLengths[month - 1]) {
            nextDayOfMonth = 1;
            nextMonth += 1;
            if (nextMonth > 12) {
                nextMonth = 1;
                nextYear += 1;
            }
        }
        char buffer[11];
        std::snprintf(buffer, sizeof(buffer), "%04d-%02d-%02d", nextYear, nextMonth, nextDayOfMonth);
        return buffer;
    }
};
