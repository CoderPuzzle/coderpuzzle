class Solution {
  public:
    long long perfectPairs(vector<int> &nums) {
        // Signs never matter: with x = |a| <= y = |b| a pair is perfect
        // exactly when y <= 2x, so work in sorted absolute values and
        // count, for each i, the later entries within double of a[i].
        vector<long long> a;
        a.reserve(nums.size());
        for (int v : nums) {
            a.push_back(v < 0 ? -(long long)v : (long long)v);
        }
        sort(a.begin(), a.end());
        // The doubled bound 2 * a[i] never shrinks as i moves right, so
        // the frontier j only ever advances; positions strictly between
        // i and j pair with i. Counts reach ~5e9, hence long long.
        long long ans = 0;
        size_t j = 0;
        for (size_t i = 0; i < a.size(); ++i) {
            while (j < a.size() && a[j] <= 2 * a[i]) {
                ++j;
            }
            ans += static_cast<long long>(j - i - 1);
        }
        return ans;
    }
};
