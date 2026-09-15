class Solution {
  public:
    int countArrays(vector<int> &digitSum) {
        const int MOD = 1000000007;
        // Group every value 0..5000 by the sum of its digits; the groups
        // are sorted, so a prefix sum plus upper_bound counts every
        // predecessor whose value is at most a candidate's value in O(log).
        vector<vector<int>> groups(51);
        for (int value = 0; value <= 5000; ++value) {
            int total = 0;
            int rest = value;
            while (rest > 0) {
                total += rest % 10;
                rest /= 10;
            }
            groups[total].push_back(value);
        }
        vector<int> previous = groups[digitSum[0]];
        if (previous.empty())
            return 0;
        vector<long long> dp(previous.size(), 1);
        for (int position = 1; position < (int)digitSum.size(); ++position) {
            vector<int> current = groups[digitSum[position]];
            if (current.empty())
                return 0;
            vector<long long> prefix(dp.size() + 1, 0);
            for (int i = 0; i < (int)dp.size(); ++i)
                prefix[i + 1] = (prefix[i] + dp[i]) % MOD;
            vector<long long> next(current.size());
            for (int k = 0; k < (int)current.size(); ++k)
                next[k] = prefix[upper_bound(previous.begin(), previous.end(), current[k]) - previous.begin()];
            dp = move(next);
            previous = move(current);
        }
        long long answer = 0;
        for (long long ways : dp)
            answer = (answer + ways) % MOD;
        return (int)answer;
    }
};
