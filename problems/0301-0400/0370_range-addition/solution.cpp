class Solution {
  public:
    vector<int> getModifiedArray(int length, vector<vector<int>> &updates) {
        // Record only where the running total changes: +inc at start,
        // -inc just past end. The extra slot makes end+1 safe at the
        // last index.
        vector<long long> diff(length + 1, 0);
        for (const auto &u : updates) {
            diff[u[0]] += u[2];
            diff[u[1] + 1] -= u[2];
        }
        // One prefix-sum sweep: position i sees exactly the updates whose
        // ranges still cover it.
        vector<int> arr(length);
        long long cur = 0;
        for (int i = 0; i < length; ++i) {
            cur += diff[i];
            arr[i] = (int)cur;
        }
        return arr;
    }
};
