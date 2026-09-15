class Solution {
  public:
    int largestInteger(vector<int> &nums, int k) {
        // One counter per possible value (0..50): how many distinct windows
        // of size k contain it.
        vector<int> count(51, 0);
        vector<int> stamp(51, -1);
        for (int start = 0; start + k <= (int)nums.size(); ++start) {
            // Dedup inside the window with a stamp: a value repeated within
            // one window still counts once there.
            for (int i = start; i < start + k; ++i) {
                if (stamp[nums[i]] != start) {
                    stamp[nums[i]] = start;
                    ++count[nums[i]];
                }
            }
        }
        // Scan down from the largest possible value: first hit wins.
        for (int value = 50; value >= 0; --value) {
            if (count[value] == 1) {
                return value;
            }
        }
        return -1;
    }
};
