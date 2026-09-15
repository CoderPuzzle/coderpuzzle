class Solution {
  public:
    int twoSumLessThanK(vector<int> &nums, int k) {
        // Sort, then two pointers: advance lo on small sums, retreat hi on
        // large ones, tracking the largest sum below k.
        sort(nums.begin(), nums.end());
        int lo = 0, hi = (int)nums.size() - 1;
        int best = -1;
        while (lo < hi) {
            int s = nums[lo] + nums[hi];
            if (s < k) {
                if (s > best)
                    best = s;
                ++lo;
            } else {
                --hi;
            }
        }
        return best;
    }
};
