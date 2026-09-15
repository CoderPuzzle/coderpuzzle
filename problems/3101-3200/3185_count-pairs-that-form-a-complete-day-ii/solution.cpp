class Solution {
  public:
    long long countCompleteDayPairs(vector<int> &hours) {
        // One left-to-right pass keeps a running count per residue class;
        // before joining its own bucket, each index adds the number of
        // earlier values carrying the complementary residue (24 - r) % 24.
        // The pair count reaches C(500000, 2) = 124999750000 at the
        // bounds, far beyond an int, so accumulate in 64-bit.
        vector<int> counts(24, 0);
        long long answer = 0;
        for (int value : hours) {
            int r = value % 24;
            answer += counts[(24 - r) % 24];
            ++counts[r];
        }
        return answer;
    }
};
