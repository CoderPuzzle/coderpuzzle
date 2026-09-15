class Solution {
  public:
    int partitionDisjoint(vector<int> &nums) {
        // Suffix minima: minFrom[i] is the minimum of nums[i:], built
        // right to left so each step reuses the suffix behind it.
        int n = nums.size();
        vector<int> minFrom(n);
        minFrom[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            minFrom[i] = min(nums[i], minFrom[i + 1]);
        }
        // Prefix max sweep: the first cut whose left max clears the
        // right min is the smallest valid left.
        int maxTo = nums[0];
        for (int i = 1; i < n; i++) {
            if (maxTo <= minFrom[i]) {
                return i;
            }
            maxTo = max(maxTo, nums[i]);
        }
        // Unreachable on valid input: the guarantee says a cut exists.
        return n - 1;
    }
};
