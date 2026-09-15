class Solution {
  public:
    int countEffective(vector<int> &nums) {
        // A removal strictly decreases the OR exactly when it takes away
        // every element carrying at least one set bit of the total. For a
        // non-empty bit set S, the subsequences removing all occurrences of
        // every bit in S are counted by 2^free(S), where free(S) is the
        // number of elements carrying no bit of S (they alone are optional).
        // Inclusion-exclusion over S turns those counts into the number of
        // subsequences killing at least one bit.
        int n = static_cast<int>(nums.size());
        int total = 0;
        for (int x : nums) {
            total |= x;
        }
        // At most 20 bits live under 10^6; compress them to low positions.
        vector<int> bits;
        for (int b = 0; b < 20; ++b) {
            if (total >> b & 1) {
                bits.push_back(b);
            }
        }
        int k = static_cast<int>(bits.size());
        int full = (1 << k) - 1;
        // g[m] = how many elements compress to mask m; then h[m] = how many
        // compress to a SUBSET of m, so h[full ^ S] = free(S). Standard
        // sum-over-subsets: push each count down to its submasks. All
        // values stay inside long long range under the modulus.
        const long long MOD = 1'000'000'007;
        vector<long long> h(1 << k, 0);
        for (int x : nums) {
            int m = 0;
            for (int i = 0; i < k; ++i) {
                if (x >> bits[i] & 1) {
                    m |= 1 << i;
                }
            }
            h[m]++;
        }
        for (int b = 0; b < k; ++b) {
            int bit = 1 << b;
            int step = bit << 1;
            for (int base = 0; base < (1 << k); base += step) {
                for (int i = base; i < base + bit; ++i) {
                    h[i + bit] = (h[i + bit] + h[i]) % MOD;
                }
            }
        }
        vector<long long> pw(n + 1);
        pw[0] = 1;
        for (int i = 1; i <= n; ++i) {
            pw[i] = pw[i - 1] * 2 % MOD;
        }
        long long ans = 0;
        for (int S = 1; S < (1 << k); ++S) {
            long long term = pw[h[full ^ S]];
            if (__builtin_popcount(S) % 2 == 0) {
                term = MOD - term;
            }
            ans = (ans + term) % MOD;
        }
        return static_cast<int>(ans % MOD);
    }
};
