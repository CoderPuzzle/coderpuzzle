class Solution {
  public:
    int numberOfSubarrays(vector<int> &nums, int k) {
        int n = nums.size();
        // counts[c] = how many earlier prefixes had odd-count c; seeding the
        // empty prefix at 0 makes subarrays starting at index 0 countable.
        vector<long long> counts(n + 1, 0);
        counts[0] = 1;
        int odds = 0;
        long long result = 0;
        for (int x : nums) {
            // Only parity matters (odd->1, even->0), so "exactly k odds"
            // becomes the classic "subarray with sum exactly k".
            odds += x & 1;
            // Every earlier prefix with odds - k pairs with the current one
            // to close one nice subarray; the guard just avoids a negative
            // index before enough odds have accumulated.
            if (odds - k >= 0) {
                result += counts[odds - k];
            }
            counts[odds]++;
        }
        return (int)result;
    }
};
