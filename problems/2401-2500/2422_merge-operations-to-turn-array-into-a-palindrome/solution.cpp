class Solution {
  public:
    int minimumOperations(vector<int> &nums) {
        // Greedy two pointers on block sums: the front block (nums[0..i])
        // must end up equal to the back block. While they differ, the
        // smaller side absorbs its next adjacent element — one merge, and
        // merging can never help the larger side catch up. Equal blocks
        // retire together and scanning continues inside. Block sums reach
        // 10^5 * 10^6 = 10^11, so they ride in long long.
        int i = 0, j = (int)nums.size() - 1;
        long long left = 0, right = 0;
        int ops = 0;
        while (i < j) {
            if (left == 0)
                left = nums[i];
            if (right == 0)
                right = nums[j];
            if (left == right) {
                ++i;
                --j;
                left = right = 0;
            } else if (left < right) {
                ++i;
                left += nums[i];
                ++ops;
            } else {
                --j;
                right += nums[j];
                ++ops;
            }
        }
        return ops;
    }
};
