#include <algorithm>
#include <utility>
#include <vector>

// Two interval lists. `singles` holds every accepted booking; `doubles`
// holds the regions where two accepted bookings already overlap. A new
// event is scanned against `doubles` first -- meeting any of them would
// park a third event on the same moment, so it is refused and nothing is
// recorded. Otherwise each accepted event it overlaps contributes the
// intersection to `doubles`, and the event itself joins `singles`.
class MyCalendarTwo {
  public:
    MyCalendarTwo() {}

    bool book(int start, int end) {
        for (const std::pair<int, int> &region : doubles) {
            if (start < region.second && region.first < end) {
                return false;
            }
        }
        for (const std::pair<int, int> &event : singles) {
            if (start < event.second && event.first < end) {
                doubles.emplace_back(std::max(start, event.first), std::min(end, event.second));
            }
        }
        singles.emplace_back(start, end);
        return true;
    }

  private:
    std::vector<std::pair<int, int>> singles;
    std::vector<std::pair<int, int>> doubles;
};
