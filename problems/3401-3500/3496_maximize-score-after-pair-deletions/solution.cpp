class Solution {
  public:
    // Operations only peel elements off the ends, so what remains is a
    // contiguous block: 1 element when n is odd, 2 adjacent when n is
    // even. Every removed element scores exactly once, so maximize the
    // score by leaving the cheapest possible block behind.
    long long maxScore(vector<int> &nums) {
        long long total = 0;
        for (int v : nums)
            total += v;
        if (nums.size() % 2 == 1) {
            int keep = nums[0];
            for (int v : nums)
                keep = min(keep, v);
            return total - keep;
        }
        int keep = nums[0] + nums[1];
        for (int i = 0; i + 1 < (int)nums.size(); i++)
            keep = min(keep, nums[i] + nums[i + 1]);
        return total - keep;
    }
};
