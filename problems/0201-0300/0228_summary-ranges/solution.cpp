class Solution {
  public:
    vector<string> summaryRanges(vector<int> &nums) {
        vector<string> ranges;
        int i = 0;
        while (i < (int)nums.size()) {
            int start = i;
            // The run extends while the next value is exactly one past the
            // current one. The guard short-circuits, so the +1 is only
            // evaluated when a successor exists — and that successor is
            // strictly larger, capping nums[i] below the 32-bit maximum.
            while (i + 1 < (int)nums.size() && nums[i + 1] == nums[i] + 1) {
                ++i;
            }
            // The run [nums[start], nums[i]] is maximal once the extension
            // stops; equal endpoints collapse to the bare "a" form.
            if (nums[start] == nums[i]) {
                ranges.push_back(to_string(nums[start]));
            } else {
                ranges.push_back(to_string(nums[start]) + "->" + to_string(nums[i]));
            }
            ++i;
        }
        return ranges;
    }
};
