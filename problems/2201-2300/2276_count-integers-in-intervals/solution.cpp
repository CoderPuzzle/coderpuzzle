#include <map>

class CountIntervals {
  public:
    CountIntervals() = default;

    void add(int left, int right) {
        int newLeft = left;
        int newRight = right;
        // Merge every stored range that reaches the newcomer: with the
        // family disjoint, all of them start at or before `right`.
        for (;;) {
            auto upper = intervals.upper_bound(right);
            auto entry = upper == intervals.begin() ? intervals.end() : std::prev(upper);
            if (entry == intervals.end() || entry->second < newLeft) {
                break;
            }
            covered -= (long long)entry->second - entry->first + 1;
            newLeft = std::min(newLeft, entry->first);
            newRight = std::max(newRight, entry->second);
            intervals.erase(entry);
        }
        covered += (long long)newRight - newLeft + 1;
        intervals.emplace(newLeft, newRight);
    }

    int count() { return (int)covered; }

  private:
    std::map<int, int> intervals; // start -> end
    long long covered = 0;
};
