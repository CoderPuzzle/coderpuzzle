class Solution {
  public:
    int sumOfFlooredPairs(vector<int> &nums) {
        const long long MOD = 1000000007LL;
        if (nums.empty()) {
            return 0;
        }
        int maxVal = 0;
        for (int v : nums) {
            maxVal = max(maxVal, v);
        }
        vector<long long> count(maxVal + 1, 0);
        for (int v : nums) {
            count[v]++;
        }
        vector<long long> prefix(maxVal + 1, 0);
        long long running = 0;
        for (int v = 0; v <= maxVal; v++) {
            running += count[v];
            prefix[v] = running;
        }
        long long total = 0;
        for (int y = 1; y <= maxVal; y++) {
            if (count[y] == 0) {
                continue;
            }
            // sum over x of floor(x / y) * count[x]
            // = sum over m >= 1 of #{x : x >= m * y}
            long long c = 0;
            for (int m = y; m <= maxVal; m += y) {
                c += prefix[maxVal] - prefix[m - 1];
            }
            total = (total + count[y] * c) % MOD;
        }
        return (int)total;
    }
};
