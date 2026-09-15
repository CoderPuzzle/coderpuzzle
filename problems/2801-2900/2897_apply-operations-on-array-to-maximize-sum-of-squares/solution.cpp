class Solution {
  public:
    int maxSum(vector<int> &nums, int k) {
        const long long MOD = 1000000007LL;

        // The operation replaces a pair with (a AND b, a OR b): the AND
        // keeps exactly the bits both values shared and the OR keeps
        // exactly the bits either had, so every bit position owns a fixed
        // pool of count[b] copies that operations merely reshuffle across
        // the array.
        long long count[30] = {};
        for (int x : nums)
            for (int b = 0; b < 30; ++b)
                if (x >> b & 1)
                    ++count[b];

        // Pour the pools into the k kept slots greedily, highest bit first:
        // a set bit raises a larger running value's square by more, so the
        // biggest slots take every bit first. Slot i then holds bit b
        // exactly when i sits below count[b], so one sweep from the OR of
        // all present bits - dropping bit b as the sweep passes index
        // count[b] - walks the final slot values directly.
        vector<int> drop(k, 0);
        int value = 0;
        for (int b = 0; b < 30; ++b)
            if (count[b]) {
                value |= 1 << b;
                if (count[b] < k)
                    drop[count[b]] |= 1 << b;
            }

        long long total = 0;
        for (int i = 0; i < k; ++i) {
            if (i)
                value ^= drop[i];
            // Slots stay below 2^30 but their squares reach ~1.15e18, so
            // the 64-bit product is reduced modulo 10^9 + 7 as the total
            // accumulates.
            total = (total + (long long)value * value) % MOD;
        }
        return total;
    }
};
