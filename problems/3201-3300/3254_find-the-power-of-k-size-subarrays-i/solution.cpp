class Solution {
  public:
    vector<int> resultsArray(vector<int> &nums, int k) {
        // run counts the consecutive +1 steps ending at the current index;
        // a size-k window is powered iff its last k - 1 adjacent pairs all
        // stepped up by one, i.e. run reaches k - 1 at the window's end.
        vector<int> results;
        results.reserve(nums.size() - (size_t)k + 1);
        int run = 0;
        for (size_t i = 0; i < nums.size(); ++i) {
            run = i > 0 && nums[i] == nums[i - 1] + 1 ? run + 1 : 0;
            if (i + 1 >= (size_t)k) {
                results.push_back(run >= k - 1 ? nums[i] : -1);
            }
        }
        return results;
    }
};
