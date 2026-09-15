class Solution {
    long long countBelow(vector<int> &nums, int bound) {
        // One-sided count of subarrays whose max is <= bound; the
        // answer follows by subtracting the two bounds.
        long long total = 0;
        long long run = 0;
        for (int v : nums) {
            if (v <= bound) {
                // run = length of the current streak of in-bounds
                // elements: this element ends exactly run new
                // subarrays, each counted once at its right end.
                run += 1;
                total += run;
            } else {
                // Above the bound: no valid subarray crosses here.
                run = 0;
            }
        }
        return total;
    }

  public:
    int numSubarrayBoundedMax(vector<int> &nums, int left, int right) {
        // Max in [left, right] iff at most right but not at most
        // left - 1; with left = 0 the subtracted count is empty.
        return (int)(countBelow(nums, right) - countBelow(nums, left - 1));
    }
};
