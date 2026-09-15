class Solution {
  public:
    vector<vector<long long>> aggregateTimeSeries(vector<vector<int>> &series1, vector<vector<int>> &series2) {
        vector<vector<long long>> merged(series1.size() + series2.size(), vector<long long>(2));
        int i = static_cast<int>(series1.size()) - 1;
        int j = static_cast<int>(series2.size()) - 1;
        int k = static_cast<int>(merged.size());
        long long value1 = 0;
        long long value2 = 0;
        // Sweep the union of timestamps from right to left. Each running
        // value is the last value its series contributed, which for every
        // timestamp still ahead of the cursor is exactly that series' next
        // available value; a series not yet reached contributes 0. Sums
        // reach 2e9, so values and results are held in long long.
        while (i >= 0 || j >= 0) {
            long long ts;
            if (j < 0 || (i >= 0 && series1[i][0] >= series2[j][0])) {
                ts = series1[i][0];
                value1 = series1[i][1];
                --i;
                if (j >= 0 && series2[j][0] == ts) {
                    value2 = series2[j][1];
                    --j;
                }
            } else {
                ts = series2[j][0];
                value2 = series2[j][1];
                --j;
            }
            --k;
            merged[k][0] = ts;
            merged[k][1] = value1 + value2;
        }
        // Shared timestamps emit one pair, not two — trim the unused head.
        merged.erase(merged.begin(), merged.begin() + k);
        return merged;
    }
};
