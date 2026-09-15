class Solution {
  public:
    double findMaxAverage(vector<int> &nums, int k) {
        int n = nums.size();
        // prefix[i] = sum of nums[:i]
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        // Exact comparison of averages via cross-multiplication:
        // s1/l1 > s2/l2  <=>  s1*l2 > s2*l1  (positive lengths).
        long long bestSum = 0;
        int bestLen = 0;
        for (int length = k; length <= n; ++length) {
            long long s = LLONG_MIN;
            for (int t = 0; t + length <= n; ++t) {
                long long v = prefix[t + length] - prefix[t];
                if (v > s)
                    s = v;
            }
            if (bestLen == 0 || s * bestLen > bestSum * length) {
                bestSum = s;
                bestLen = length;
            }
        }
        return (double)bestSum / (double)bestLen;
    }
};
