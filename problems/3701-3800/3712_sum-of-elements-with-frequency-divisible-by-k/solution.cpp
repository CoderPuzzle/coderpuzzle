class Solution {
  public:
    int sumDivisibleByK(vector<int> &nums, int k) {
        // Qualification is decided per value: drop every element into the
        // bucket of its own value; values are bounded by 100, so the value
        // itself indexes a fixed array of counters.
        vector<int> counts(101, 0);
        for (int num : nums) {
            counts[num]++;
        }
        // A bucket qualifies when its count is a positive multiple of k;
        // it then contributes its value once per occurrence.
        int total = 0;
        for (int value = 1; value <= 100; value++) {
            if (counts[value] > 0 && counts[value] % k == 0) {
                total += value * counts[value];
            }
        }
        return total;
    }
};
