#include <deque>

// A queue of ping times: ping(t) appends t, evicts everything older than
// the window's left edge t - 3000 off the front — a time below that edge
// is below every future edge too, since t only grows — and returns how
// many times remain.
class RecentCounter {
  public:
    RecentCounter() {}

    int ping(int t) {
        times.push_back(t);
        while (times.front() < t - 3000) {
            // The left edge t - 3000 only moves right, so everything
            // evicted now is gone from every future window as well.
            times.pop_front();
        }
        return static_cast<int>(times.size());
    }

  private:
    std::deque<int> times;
};
