class Solution {
  public:
    int minimumDeletions(vector<int> &nums) {
        int minimumIndex = 0;
        int maximumIndex = 0;
        for (int index = 1; index < static_cast<int>(nums.size()); ++index) {
            if (nums[index] < nums[minimumIndex]) {
                minimumIndex = index;
            }
            if (nums[index] > nums[maximumIndex]) {
                maximumIndex = index;
            }
        }

        int left = min(minimumIndex, maximumIndex);
        int right = max(minimumIndex, maximumIndex);
        int length = static_cast<int>(nums.size());
        return min({right + 1, length - left, left + 1 + length - right});
    }
};
