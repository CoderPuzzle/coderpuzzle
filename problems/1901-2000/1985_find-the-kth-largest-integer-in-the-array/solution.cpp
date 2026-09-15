class Solution {
  public:
    string kthLargestNumber(vector<string> &nums, int k) {
        // A string of more digits is always the larger integer, so ordering
        // by length first and lexicographically second is numeric order.
        sort(nums.begin(), nums.end(),
             [](const string &a, const string &b) { return a.size() != b.size() ? a.size() < b.size() : a < b; });
        return nums[nums.size() - k];
    }
};
