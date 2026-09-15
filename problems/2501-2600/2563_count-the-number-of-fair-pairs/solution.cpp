class Solution {
  public:
    // Sliding window: once arr[lo] + arr[hi] <= limit, every index between
    // lo and hi pairs with lo as well, worth hi - lo pairs.
    long long countAtMost(vector<int> &arr, long long limit) {
        long long total = 0;
        int lo = 0, hi = (int)arr.size() - 1;
        while (lo < hi) {
            if ((long long)arr[lo] + arr[hi] <= limit) {
                total += hi - lo;
                ++lo;
            } else {
                --hi;
            }
        }
        return total;
    }
    long long countFairPairs(vector<int> &nums, int lower, int upper) {
        // Sorting discards index identity, but fairness only depends on
        // values: counting ordered positions i < j in the sorted array
        // counts each original pair exactly once. Pair sums reach +-2e9
        // and answers reach C(n,2) ~= 5e9, both beyond int, so the whole
        // count runs in 64-bit arithmetic.
        vector<int> arr(nums);
        sort(arr.begin(), arr.end());
        return countAtMost(arr, upper) - countAtMost(arr, (long long)lower - 1);
    }
};
