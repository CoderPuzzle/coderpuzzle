class Solution {
  public:
    long long countSubarrays(vector<int> &nums, int k) {
        // Suffix ANDs ending at one index take at most ~30 distinct values:
        // walking the left end rightward can only clear bits, so every value
        // change drops at least one bit. (value, count) buckets make the
        // scan O(n * 30) instead of enumerating all subarrays. The answer
        // reaches n * (n + 1) / 2 = 5,000,050,000, past int range, so it
        // accumulates in 64-bit.
        long long total = 0;
        vector<int> values, nextValues;
        vector<long long> counts, nextCounts;
        for (int index = 0; index < (int)nums.size(); index++) {
            int value = nums[index];
            nextValues.assign(1, value);
            nextCounts.assign(1, 1LL);
            for (int i = 0; i < (int)values.size(); i++) {
                int merged = values[i] & value;
                if (nextValues.back() == merged) {
                    nextCounts.back() += counts[i];
                } else {
                    nextValues.push_back(merged);
                    nextCounts.push_back(counts[i]);
                }
            }
            values.swap(nextValues);
            counts.swap(nextCounts);
            for (int i = 0; i < (int)values.size(); i++) {
                if (values[i] == k) {
                    total += counts[i];
                }
            }
        }
        return total;
    }
};
