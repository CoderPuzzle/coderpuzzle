class Solution {
  public:
    vector<int> maximumBeauty(vector<vector<int>> &items, vector<int> &queries) {
        sort(items.begin(), items.end(), [](const auto &left, const auto &right) { return left[0] < right[0]; });

        vector<int> prefixBeauty(items.size());
        int best = 0;
        for (int index = 0; index < static_cast<int>(items.size()); ++index) {
            best = max(best, items[index][1]);
            prefixBeauty[index] = best;
        }

        vector<int> answer;
        answer.reserve(queries.size());
        for (int query : queries) {
            int low = 0;
            int high = static_cast<int>(items.size());
            while (low < high) {
                int middle = low + (high - low) / 2;
                if (items[middle][0] <= query) {
                    low = middle + 1;
                } else {
                    high = middle;
                }
            }
            answer.push_back(low == 0 ? 0 : prefixBeauty[low - 1]);
        }
        return answer;
    }
};
