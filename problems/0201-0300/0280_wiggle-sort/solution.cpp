class Solution {
  public:
    vector<int> wiggleSort(vector<int> &nums) {
        // One pass: each pair demands its own relation, and repairing a
        // violated pair with a single swap never re-breaks the pair before it.
        for (int i = 1; i < (int)nums.size(); ++i) {
            // Odd i demands nums[i-1] <= nums[i]; even i the reverse.
            bool rise = i % 2 == 1;
            if (rise ? nums[i - 1] > nums[i] : nums[i - 1] < nums[i]) {
                swap(nums[i - 1], nums[i]);
            }
        }
        return nums;
    }
};
