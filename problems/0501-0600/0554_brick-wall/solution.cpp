class Solution {
  public:
    int leastBricks(vector<vector<int>> &wall) {
        unordered_map<int, int> edgeCounts;
        // Flip the question: a line at position p crosses a row unless that
        // row has a brick edge at p, so count edges per position.
        for (const auto &row : wall) {
            // 64-bit accumulator: cumulative widths can exceed 32-bit range.
            long long position = 0;
            // Prefix sums excluding the last brick: the final cumulative
            // width is the wall's right border, which is forbidden.
            for (size_t i = 0; i + 1 < row.size(); i++) {
                position += row[i];
                edgeCounts[(int)position]++;
            }
        }
        // Rows minus the most-shared edge position; 0 covers walls where
        // every row is a single brick.
        int bestEdges = 0;
        for (const auto &[position, count] : edgeCounts) {
            bestEdges = max(bestEdges, count);
        }
        return (int)wall.size() - bestEdges;
    }
};
