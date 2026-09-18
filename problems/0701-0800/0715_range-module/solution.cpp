#include <algorithm>
#include <vector>

class RangeModule {
  public:
    RangeModule() {}

    void addRange(int start, int end) {
        int i = lowerBound(ends, start); // first interval ending at/after start
        int j = upperBound(starts, end); // first interval starting after end
        if (i < j) {
            start = std::min(start, starts[i]);
            end = std::max(end, ends[j - 1]);
        }
        splice(starts, i, j, start);
        splice(ends, i, j, end);
    }

    bool queryRange(int start, int end) {
        int i = upperBound(starts, start) - 1; // last interval starting at/before start
        return i >= 0 && ends[i] >= end;
    }

    void removeRange(int start, int end) {
        int i = upperBound(ends, start); // first interval ending after start
        int j = lowerBound(starts, end); // first interval starting after end
        std::vector<int> newStarts;
        std::vector<int> newEnds;
        if (i < j) {
            if (starts[i] < start) {
                newStarts.push_back(starts[i]);
                newEnds.push_back(start);
            }
            if (ends[j - 1] > end) {
                newStarts.push_back(end);
                newEnds.push_back(ends[j - 1]);
            }
        }
        replace(starts, i, j, newStarts);
        replace(ends, i, j, newEnds);
    }

  private:
    // Tracked set as canonical disjoint intervals (parallel starts/ends):
    // the vectors stay sorted and gap-separated, so a fully-tracked query
    // is always contained in a single stored interval.
    std::vector<int> starts;
    std::vector<int> ends;

    /** First index with values[index] >= target (bisect_left). */
    static int lowerBound(const std::vector<int> &values, int target) {
        return int(std::lower_bound(values.begin(), values.end(), target) - values.begin());
    }

    /** First index with values[index] > target (bisect_right). */
    static int upperBound(const std::vector<int> &values, int target) {
        return int(std::upper_bound(values.begin(), values.end(), target) - values.begin());
    }

    static void splice(std::vector<int> &values, int from, int to, int value) {
        values.erase(values.begin() + from, values.begin() + to);
        values.insert(values.begin() + from, value);
    }

    static void replace(std::vector<int> &values, int from, int to, const std::vector<int> &replacement) {
        values.erase(values.begin() + from, values.begin() + to);
        values.insert(values.begin() + from, replacement.begin(), replacement.end());
    }
};
