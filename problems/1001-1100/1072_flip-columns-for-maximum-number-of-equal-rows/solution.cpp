class Solution {
  public:
    int maxEqualRowsAfterFlips(vector<vector<int>> &matrix) {
        // column flips XOR one fixed mask onto every row at once, so a row
        // turns uniform iff it equals the mask or its complement: exactly
        // the identical-or-complementary rows can be fixed together
        unordered_map<string, int> counts;
        int best = 0;
        for (const auto &row : matrix) {
            // canonical key: every cell XOR the row's own first cell —
            // identical rows and complementary rows collapse to one key
            string key;
            key.reserve(row.size());
            for (int value : row) {
                key.push_back('0' + (char)(value ^ row[0]));
            }
            best = max(best, ++counts[key]);
        }
        return best;
    }
};
