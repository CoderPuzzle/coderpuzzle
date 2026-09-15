class Solution {
  public:
    bool checkValidCuts(int n, std::vector<std::vector<int>> &rectangles) {
        return hasTwoGaps(rectangles, 0) || hasTwoGaps(rectangles, 1);
    }

  private:
    bool hasTwoGaps(std::vector<std::vector<int>> &rectangles, int axis) {
        // Two cuts split the rectangles along one axis exactly when that
        // axis's [start, end] projections fall into three or more groups.
        // Sweep the sorted projections once with a running furthest end:
        // each next start at or beyond it is a gap where a cut can pass
        // (touching edges included), and two such gaps make three groups.
        std::vector<std::pair<int, int>> intervals;
        intervals.reserve(rectangles.size());
        for (const auto &r : rectangles) {
            intervals.push_back({r[axis], r[axis + 2]});
        }
        std::sort(intervals.begin(), intervals.end());
        int gaps = 0;
        int reach = intervals[0].second;
        for (size_t i = 1; i < intervals.size(); i++) {
            if (intervals[i].first >= reach) {
                if (++gaps == 2)
                    return true;
            }
            reach = std::max(reach, intervals[i].second);
        }
        return false;
    }
};
