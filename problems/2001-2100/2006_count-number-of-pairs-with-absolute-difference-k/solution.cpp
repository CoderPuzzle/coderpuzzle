class Solution {
  public:
    int countKDifference(vector<int> &nums, int k) {
        int pairs = 0;
        for (int first = 0; first < (int)nums.size(); ++first) {
            for (int second = first + 1; second < (int)nums.size(); ++second) {
                if (abs(nums[first] - nums[second]) == k) {
                    ++pairs;
                }
            }
        }
        return pairs;
    }
};
