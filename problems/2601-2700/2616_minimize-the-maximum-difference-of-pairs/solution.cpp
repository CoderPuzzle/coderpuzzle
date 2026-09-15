class Solution {
  public:
    int minimizeMax(vector<int> &nums, int p) {
        // An optimal selection can always pair adjacent sorted values, so
        // sort once and ask: does a cap `diff` admit p disjoint pairs? The
        // predicate is monotone in diff — a larger cap only admits more
        // pairs — so binary search the minimum feasible cap over the span.
        // p = 0 succeeds at 0 since the empty set's max is 0.
        vector<int> sorted(nums);
        sort(sorted.begin(), sorted.end());
        int n = (int)sorted.size();
        int lo = 0, hi = sorted[n - 1] - sorted[0];
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (can(sorted, mid, p))
                hi = mid;
            else
                lo = mid + 1;
        }
        return lo;
    }

  private:
    bool can(vector<int> &nums, int diff, int p) {
        // Greedy scan: take every adjacent pair within diff and skip one
        // element otherwise. Taking each cheap pair is safe (exchange
        // argument), so this counts the maximum pairs under the cap.
        int count = 0;
        int i = 1;
        while (i < (int)nums.size()) {
            if (nums[i] - nums[i - 1] <= diff) {
                count++;
                i += 2;
            } else {
                i += 1;
            }
        }
        return count >= p;
    }
};
