class Solution {
  public:
    double champagneTower(double poured, int query_row, int query_glass) {
        // Row-by-row simulation. row[j] is the total champagne glass j of the
        // current row has received; a full glass splits its excess equally
        // between the two glasses below, and rows below query_row never matter.
        vector<double> row = {poured};
        for (int i = 0; i < query_row; ++i) {
            vector<double> next(row.size() + 1, 0.0);
            for (int j = 0; j < (int)row.size(); ++j) {
                double excess = (row[j] - 1.0) / 2.0;
                if (excess > 0.0) {
                    next[j] += excess;
                    next[j + 1] += excess;
                }
            }
            row = move(next);
        }
        return min(1.0, row[query_glass]);
    }
};
