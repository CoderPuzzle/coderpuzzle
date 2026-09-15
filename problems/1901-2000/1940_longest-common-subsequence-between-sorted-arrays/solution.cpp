class Solution {
  public:
    vector<int> longestCommonSubsequence(vector<vector<int>> &arrays) {
        // Each array is strictly increasing, so a value appears at most once
        // per array; it is common to all arrays exactly when it is counted
        // arrays.size() times. Values are bounded by 1..100, so a fixed-size
        // count array replaces the map and yields ascending order for free.
        int counts[101] = {0};
        for (const auto &arr : arrays) {
            for (int value : arr) {
                counts[value]++;
            }
        }
        vector<int> result;
        for (int v = 1; v <= 100; ++v) {
            if (counts[v] == (int)arrays.size()) {
                result.push_back(v);
            }
        }
        return result;
    }
};
