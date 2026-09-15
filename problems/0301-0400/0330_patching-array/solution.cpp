class Solution {
  public:
    int minPatches(vector<int> &nums, int n) {
        int patches = 0;
        size_t i = 0;
        // Invariant: every sum in [1, reachable) is formable; reachable
        // itself is the smallest sum that is not.
        long long reachable = 1;
        while (reachable <= n) {
            // Consume nums[i] while it fits inside the covered range: it
            // extends coverage to [1, reachable + nums[i]) at no patch cost.
            if (i < nums.size() && nums[i] <= reachable) {
                reachable += nums[i];
                i++;
            } else {
                // Genuine gap: patch reachable itself (any smaller patch
                // covers less, any larger leaves the gap) and double.
                reachable += reachable;
                patches++;
            }
        }
        return patches;
    }
};
