class Solution {
  public:
    vector<long long> resultArray(vector<int> &nums, int k) {
        // Removing a prefix and a suffix is the same as choosing the
        // non-empty contiguous middle that survives, so result[x] counts
        // subarrays whose product is x mod k. The running DP extends every
        // subarray ending at the previous element by nums[i] and adds the
        // singleton [i]. Counts reach 5,000,050,000 for n = 10^5 — beyond
        // int — and r * nums[i] reaches 4 * 10^9, so both are long long.
        vector<long long> counts(k, 0), result(k, 0);
        for (int num : nums) {
            vector<long long> extended(k, 0);
            for (int r = 0; r < k; ++r) {
                if (counts[r] > 0) {
                    extended[(long long)r * num % k] += counts[r];
                }
            }
            extended[num % k] += 1;
            for (int r = 0; r < k; ++r) {
                result[r] += extended[r];
            }
            counts = move(extended);
        }
        return result;
    }
};
