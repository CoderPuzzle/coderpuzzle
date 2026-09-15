class Solution {
  public:
    vector<int> getFinalState(vector<int> &nums, int k, int multiplier) {
        // The bounds are tiny (n <= 100, k <= 10), so replay the process
        // literally: each operation makes one linear scan for the first
        // occurrence of the minimum — a strict '<' comparison never replaces
        // an equal earlier value, so ties resolve to the leftmost index —
        // and multiplies that slot. No heap is needed to accelerate ten
        // short scans, and no wider arithmetic either: an element is
        // multiplied at most k times, so it never exceeds
        // 100 * 5^10 = 976562500 < 2^31 - 1.
        int n = (int)nums.size();
        for (int op = 0; op < k; ++op) {
            int idx = 0;
            for (int i = 1; i < n; ++i) {
                if (nums[i] < nums[idx]) {
                    idx = i;
                }
            }
            nums[idx] *= multiplier;
        }
        return nums;
    }
};
