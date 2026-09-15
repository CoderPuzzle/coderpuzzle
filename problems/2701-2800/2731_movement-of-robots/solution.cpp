class Solution {
  public:
    int sumDistance(vector<int> &nums, string s, int d) {
        // Collisions only swap identities, so final positions are x +/- d.
        const long long MOD = 1000000007LL;
        int n = (int)nums.size();
        vector<long long> pos(n);
        for (int i = 0; i < n; i++) {
            pos[i] = (long long)nums[i] + (s[i] == 'R' ? (long long)d : -(long long)d);
        }
        sort(pos.begin(), pos.end());
        long long total = 0;
        long long prefix = 0;
        for (int i = 0; i < n; i++) {
            long long p = pos[i];
            total += p * i - prefix;
            total %= MOD;
            prefix += p;
        }
        long long ans = ((total % MOD) + MOD) % MOD;
        return (int)ans;
    }
};
