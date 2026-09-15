class Solution {
  public:
    vector<long long> minOperations(vector<int> &nums, vector<int> &queries) {
        vector<int> sorted(nums);
        sort(sorted.begin(), sorted.end());
        int n = (int)sorted.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + sorted[i];
        }
        vector<long long> out;
        out.reserve(queries.size());
        for (int q : queries) {
            // Each query is the sum of |nums[i] - q|; sorted prefix sums make
            // it one binary search plus O(1) arithmetic. j counts elements
            // strictly below q (ties land right but contribute zero either
            // way): smaller ones are raised to q, the rest are lowered.
            int j = (int)(lower_bound(sorted.begin(), sorted.end(), q) - sorted.begin());
            long long left = (long long)q * j - prefix[j];
            long long right = (prefix[n] - prefix[j]) - (long long)q * (n - j);
            out.push_back(left + right);
        }
        return out;
    }
};
