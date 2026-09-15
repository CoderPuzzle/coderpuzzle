#include <chrono>
#include <cstdio>
#include <string>

class Solution {
  public:
    std::string nextDay(std::string date) {
        // The engine owns the calendar: lifting the parsed fields into a
        // chrono year_month_day and stepping one day through sys_days
        // renormalizes month lengths, leap years, and the year boundary,
        // so reading the fields back only leaves the zero-padded rendering.
        std::chrono::year_month_day day(std::chrono::year(std::stoi(date.substr(0, 4))),
                                        std::chrono::month(std::stoi(date.substr(5, 2))),
                                        std::chrono::day(std::stoi(date.substr(8, 2))));
        std::chrono::year_month_day next(std::chrono::sys_days(day) + std::chrono::days(1));
        char buffer[11];
        std::snprintf(buffer, sizeof(buffer), "%04d-%02d-%02d", int(next.year()), int(unsigned(next.month())),
                      int(unsigned(next.day())));
        return buffer;
    }
};
