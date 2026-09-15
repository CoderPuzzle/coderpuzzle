class Solution {
  public:
    int numOfPairs(vector<string> &nums, string target) {
        int pairs = 0;
        for (int first = 0; first < (int)nums.size(); ++first) {
            for (int second = 0; second < (int)nums.size(); ++second) {
                if (first != second && nums[first] + nums[second] == target) {
                    ++pairs;
                }
            }
        }
        return pairs;
    }
};
