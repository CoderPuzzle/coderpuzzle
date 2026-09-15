#include <vector>

// Sorted disjoint [start, end] intervals, merged at add time; addNum
// binary-searches the starts for the value's slot and repairs at most the
// two neighbors; getIntervals hands out a copy.
class SummaryRanges {
  public:
    SummaryRanges() {}

    void addNum(int value) {
        size_t low = 0;
        size_t high = intervals.size();
        while (low < high) {
            size_t middle = low + (high - low) / 2;
            if (intervals[middle][0] < value) {
                low = middle + 1;
            } else {
                high = middle;
            }
        }
        size_t index = low;
        bool touches_left = index > 0 && intervals[index - 1][1] + 1 >= value;
        bool touches_right = index < intervals.size() && intervals[index][0] - 1 <= value;
        if (touches_left && touches_right) {
            // value welds the two neighbors into one interval.
            intervals[index - 1][1] = intervals[index][1];
            intervals.erase(intervals.begin() + index);
        } else if (touches_left) {
            // Extend the left neighbor; a value it already covers is a no-op.
            intervals[index - 1][1] = max(intervals[index - 1][1], value);
        } else if (touches_right) {
            intervals[index][0] = value;
        } else {
            intervals.insert(intervals.begin() + index, {value, value});
        }
    }

    vector<vector<int>> getIntervals() { return intervals; }

  private:
    vector<vector<int>> intervals;
};
