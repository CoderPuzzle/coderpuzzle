class Solution {
  public:
    long long minCost(string s, vector<int> &cost) {
        vector<long long> totals(26, 0);
        for (int i = 0; i < (int)s.size(); i++) {
            totals[s[i] - 'a'] += cost[i];
        }
        long long sum = 0;
        long long best = 0;
        for (long long t : totals) {
            sum += t;
            best = max(best, t);
        }
        return sum - best;
    }
};
