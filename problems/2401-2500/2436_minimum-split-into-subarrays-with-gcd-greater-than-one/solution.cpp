class Solution {
  public:
    int minimumSplits(vector<int> &nums) {
        // A block's gcd only ever shrinks as it absorbs elements, so the
        // greedy is forced: keep extending the open block while its running
        // gcd stays above 1, and cut exactly when the next element would
        // drop it to 1. Cutting earlier can never help — any split of a
        // still-good prefix leaves the right part no better off.
        int parts = 1;
        int run = nums[0];
        for (int i = 1; i < (int)nums.size(); ++i) {
            run = gcd(run, nums[i]);
            if (run == 1) {
                ++parts;
                run = nums[i];
            }
        }
        return parts;
    }
};
