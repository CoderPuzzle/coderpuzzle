#include <map>

class MyCalendarThree {
  public:
    MyCalendarThree() {}

    int book(int start, int end) {
        delta[start] += 1;
        delta[end] -= 1;
        int best = 0;
        int active = 0;
        // Sweep boundaries in time order; the running sum is the number of
        // events active at that moment, so its peak is the deepest overlap
        // seen. Changes at one instant merge, so an interval closing where
        // another opens is never counted twice.
        for (const auto &[time, change] : delta) {
            active += change;
            if (active > best) {
                best = active;
            }
        }
        return best;
    }

  private:
    // Per-instant change in the number of live intervals: +1 where one
    // opens, -1 where one closes.
    std::map<int, int> delta;
};
