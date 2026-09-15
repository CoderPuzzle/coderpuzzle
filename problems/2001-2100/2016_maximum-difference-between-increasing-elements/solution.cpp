class Solution {
  public:
    int maximumDifference(vector<int> &nums) {
        int minimum = nums[0];
        int answer = -1;
        for (int index = 1; index < (int)nums.size(); ++index) {
            if (nums[index] > minimum) {
                answer = max(answer, nums[index] - minimum);
            }
            minimum = min(minimum, nums[index]);
        }
        return answer;
    }
};
