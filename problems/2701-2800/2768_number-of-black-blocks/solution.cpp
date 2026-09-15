class Solution {
  public:
    vector<long long> countBlackBlocks(int m, int n, vector<vector<int>> &coordinates) {
        vector<long long> answer(5);
        unordered_map<long long, int> counts;
        for (vector<int> &coordinate : coordinates) {
            int x = coordinate[0];
            int y = coordinate[1];
            for (int dx = -1; dx <= 0; dx++) {
                for (int dy = -1; dy <= 0; dy++) {
                    int bx = x + dx;
                    int by = y + dy;
                    if (bx >= 0 && bx < m - 1 && by >= 0 && by < n - 1) {
                        ++counts[static_cast<long long>(bx) * n + by];
                    }
                }
            }
        }
        answer[0] = static_cast<long long>(m - 1) * (n - 1) - static_cast<long long>(counts.size());
        for (const auto &entry : counts) {
            ++answer[entry.second];
        }
        return answer;
    }
};
