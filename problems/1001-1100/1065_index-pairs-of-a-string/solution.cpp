class Solution {
  public:
    vector<vector<int>> indexPairs(string text, vector<string> &words) {
        vector<vector<int>> result;
        int n = (int)text.size();
        for (int i = 0; i < n; ++i) {
            for (auto &word : words) {
                int end = i + (int)word.size();
                if (end <= n && text.compare(i, word.size(), word) == 0) {
                    result.push_back({i, end - 1});
                }
            }
        }
        sort(result.begin(), result.end());
        return result;
    }
};
