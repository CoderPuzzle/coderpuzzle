class Solution {
  public:
    vector<int> concatWithReverse(vector<int> &nums) {
        int n = (int)nums.size();
        vector<int> answer(2 * n);
        for (int i = 0; i < n; ++i) {
            answer[i] = nums[i];
            answer[n + i] = nums[n - i - 1];
        }
        return answer;
    }
};
