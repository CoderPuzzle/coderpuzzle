class Solution {
  public:
    int countCornerRectangles(vector<vector<int>> &grid) {
        // Scan the rows top to bottom. Every pair of 1-columns in the current
        // row completes one rectangle with each earlier row that already
        // showed the same column pair, so a counter on column pairs charges
        // exactly one unit of work per rectangle.
        int n = grid[0].size();
        unordered_map<long long, int> pairRows;
        long long total = 0;
        for (const auto &row : grid) {
            vector<int> ones;
            for (int c = 0; c < n; ++c) {
                if (row[c] == 1) {
                    ones.push_back(c);
                }
            }
            for (size_t i = 0; i < ones.size(); ++i) {
                long long base = (long long)ones[i] * n;
                for (size_t j = i + 1; j < ones.size(); ++j) {
                    long long key = base + ones[j];
                    int earlier = pairRows[key];
                    total += earlier;
                    pairRows[key] = earlier + 1;
                }
            }
        }
        return (int)total;
    }
};
