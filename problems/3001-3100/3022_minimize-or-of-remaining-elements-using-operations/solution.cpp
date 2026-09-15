class Solution {
  public:
    int minOrAfterOperations(vector<int> &nums, int k) {
        int n = nums.size();
        int total = 0;
        for (int value : nums)
            total |= value;

        auto groupsFor = [&](int forbidden) {
            int groups = 0;
            int running = -1;
            for (int value : nums) {
                running &= value;
                if ((running & forbidden) == 0) {
                    ++groups;
                    running = -1;
                }
            }
            if (running != -1 && groups == 0)
                return -1;
            return groups;
        };

        int forbidden = 0;
        for (int bit = 29; bit >= 0; --bit) {
            int candidate = forbidden | (1 << bit);
            int groups = groupsFor(candidate);
            if (groups != -1 && n - groups <= k)
                forbidden = candidate;
        }
        return total & ~forbidden;
    }
};
