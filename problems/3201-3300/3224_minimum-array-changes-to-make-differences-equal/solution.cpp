class Solution {
  public:
    int minChanges(vector<int> &nums, int k) {
        // Every symmetric pair (nums[i], nums[n-1-i]) must end up exactly d
        // apart for one shared difference d, so the answer is the cheapest
        // per-pair total over all k + 1 candidates. Sorted as lo <= hi, a
        // pair whose difference already equals d costs 0; otherwise one
        // replacement fixes it exactly when the moved value stays inside
        // [0, k], which is equivalent to d <= hi or d <= k - lo; failing
        // that, the pair costs 2. Bucket exact matches and add a +1 range
        // mark for each one-change reach, then sweep d once: cost(d) =
        // n - reachable(d) - exact(d). Totals stay below n, so int suffices.
        int half = nums.size() / 2;
        vector<int> exact(k + 1, 0);
        vector<int> delta(k + 2, 0);
        for (int i = 0; i < half; i++) {
            int a = nums[i];
            int b = nums[nums.size() - 1 - i];
            if (a > b) {
                swap(a, b);
            }
            exact[b - a]++;
            int reach = max(b, k - a);
            delta[0]++;
            delta[reach + 1]--;
        }
        int best = 2 * half;
        int reachable = 0;
        for (int d = 0; d <= k; d++) {
            reachable += delta[d];
            best = min(best, 2 * half - reachable - exact[d]);
        }
        return best;
    }
};
