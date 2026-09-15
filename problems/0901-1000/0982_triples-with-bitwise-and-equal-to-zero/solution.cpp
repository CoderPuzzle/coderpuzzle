class Solution {
  public:
    long long countTriplets(vector<int> &nums) {
        // A triple's AND vanishes exactly when the first two values' AND is
        // a submask of the third value's complement. One pass over all n^2
        // ordered pairs records f[v] = pairs with nums[i] & nums[j] == v, a
        // subset zeta transform turns f into h[m] = sum of f over the
        // submasks of m, and each k then contributes h[~nums[k] & 0xFFFF].
        int full = 1 << 16;
        vector<long long> f(full, 0);
        for (int x : nums) {
            for (int y : nums) {
                ++f[x & y];
            }
        }
        for (int b = 0; b < 16; b++) {
            int bit = 1 << b;
            for (int mask = 0; mask < full; mask++) {
                if (mask & bit) {
                    f[mask] += f[mask ^ bit];
                }
            }
        }
        long long answer = 0;
        for (int x : nums) {
            answer += f[~x & 0xFFFF];
        }
        return answer;
    }
};
