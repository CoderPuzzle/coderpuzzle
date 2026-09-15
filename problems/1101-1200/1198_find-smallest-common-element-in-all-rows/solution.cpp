class Solution {
  public:
    int smallestCommonElement(vector<vector<int>> &mat) {
        vector<int> tally(10001, 0);
        for (const auto &row : mat) {
            for (int value : row) {
                tally[value]++;
            }
        }
        for (int value = 1; value <= 10000; value++) {
            if (tally[value] == (int)mat.size()) {
                // Strictly increasing rows never repeat a value, so only a
                // value present in every row can reach count m.
                return value;
            }
        }
        return -1;
    }
};
