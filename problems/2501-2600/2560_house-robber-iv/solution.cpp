class Solution {
  public:
    int minCapability(vector<int> &nums, int k) {
        int lo = nums[0], hi = nums[0];
        for (int x : nums) {
            lo = min(lo, x);
            hi = max(hi, x);
        }
        // "k non-adjacent houses all <= cap" is monotone in cap, so binary
        // search the smallest feasible cap over the value range [min, max] —
        // raw values, so nums needs no sorting. Lower-mid since we minimize.
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (feasible(nums, mid, k)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

  private:
    bool feasible(vector<int> &nums, int cap, int k) {
        // Greedy scan: take every house that fits under the cap and skip its
        // neighbor. Taking an eligible house is never worse than skipping it
        // — skipping forfeits a pick without unlocking a better one — so this
        // counts the maximum non-adjacent picks.
        int count = 0;
        int i = 0;
        while (i < (int)nums.size()) {
            if (nums[i] <= cap) {
                count++;
                i += 2;
            } else {
                i++;
            }
        }
        return count >= k;
    }
};
