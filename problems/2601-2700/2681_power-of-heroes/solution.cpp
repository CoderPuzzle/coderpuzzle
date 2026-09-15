class Solution {
  public:
    int sumOfPower(vector<int> &nums) {
        const long long MOD = 1000000007LL;
        vector<int> arr(nums);
        sort(arr.begin(), arr.end());
        long long ans = 0;
        // s = sum of v * 2^(elements after v) over the processed prefix:
        // each earlier minimum's (minimum, padding) variants collapsed into
        // one accumulator, so a group's power x^2 * min is summed without
        // enumerating subsets.
        long long s = 0;
        for (int x : arr) {
            long long lx = x;
            // x is the group maximum here; the + x covers the singleton
            // group where x is its own minimum. Folded under the modulus
            // since raw values reach (10^9)^3.
            ans = (ans + (lx * lx % MOD) * ((s + lx) % MOD)) % MOD;
            // Advancing the sweep: every existing combination survives with
            // or without x as padding (doubling s), and x registers as a
            // fresh minimum.
            s = (2 * s + lx) % MOD;
        }
        return (int)ans;
    }
};
