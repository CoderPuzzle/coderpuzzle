class Solution {
  public:
    long long maxTotalValue(vector<int> &nums, int k) {
        // No subarray can beat the whole array: it sees only a subset of
        // the elements, so its maximum never exceeds the global maximum
        // and its minimum never drops below the global minimum. Repeating
        // the whole array as every pick attains that spread k times. The
        // spread reaches 10^9 and k reaches 10^5, so the product needs
        // long long even though every element fits in int.
        long long lo = *min_element(nums.begin(), nums.end());
        long long hi = *max_element(nums.begin(), nums.end());
        return (hi - lo) * k;
    }
};
