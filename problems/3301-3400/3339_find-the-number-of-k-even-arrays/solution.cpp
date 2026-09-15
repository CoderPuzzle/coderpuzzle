class Solution {
  public:
    int countOfArrays(int n, int m, int k) {
        // (arr[i] * arr[i+1]) - arr[i] - arr[i+1] = (arr[i]-1) *
        // (arr[i+1]-1) - 1, which is even exactly when BOTH neighbors are
        // even — so k-even means exactly k adjacent pairs have both
        // elements even. With E = m/2 (floor) even values and O = m - E
        // odd values, track per length i, for each pair count j, how many
        // arrays end in an even value and how many end in an odd one.
        // Extending by an even value (E choices) lifts an even-ending
        // j-1-pair state to j pairs and leaves odd-ending states in
        // place; extending by an odd value (O choices) never changes the
        // count. Entries stay below MOD, so every join multiplies a value
        // below 2 * MOD by at most 500 — about 10^12, kept in long long.
        const long long MOD = 1000000007;
        int even = m / 2;
        int odd = m - even;
        vector<long long> endEven(n, 0), endOdd(n, 0);
        endEven[0] = even;
        endOdd[0] = odd;
        for (int len = 1; len < n; ++len) {
            vector<long long> nextEven(n, 0), nextOdd(n, 0);
            for (int j = 0; j < n; ++j) {
                nextEven[j] = (j > 0 ? endEven[j - 1] : 0) + endOdd[j];
                nextEven[j] = nextEven[j] * even % MOD;
                nextOdd[j] = (endEven[j] + endOdd[j]) * odd % MOD;
            }
            endEven = move(nextEven);
            endOdd = move(nextOdd);
        }
        return (int)((endEven[k] + endOdd[k]) % MOD);
    }
};
