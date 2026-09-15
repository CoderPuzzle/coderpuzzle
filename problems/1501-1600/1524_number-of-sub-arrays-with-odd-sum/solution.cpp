class Solution {
  public:
    int numOfSubarrays(vector<int> &arr) {
        // `even`/`odd` count prefixes seen so far (including the empty
        // prefix before the array) with even/odd parity; a new odd-parity
        // prefix pairs with every earlier even prefix to make an odd-sum
        // subarray, and symmetrically for a new even-parity prefix. `total`
        // is int64_t so the running sum never overflows before the mod is
        // applied.
        const int64_t MOD = 1'000'000'007;
        int64_t even = 1;
        int64_t odd = 0;
        int parity = 0;
        int64_t total = 0;
        for (int x : arr) {
            parity ^= x & 1;
            if (parity == 1) {
                total = (total + even) % MOD;
                odd++;
            } else {
                total = (total + odd) % MOD;
                even++;
            }
        }
        return static_cast<int>(total);
    }
};
