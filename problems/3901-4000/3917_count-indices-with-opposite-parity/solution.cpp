class Solution {
  public:
    vector<int> countOppositeParity(vector<int> &nums) {
        int even = 0;
        int odd = 0;
        vector<int> answer(nums.size());
        for (int i = (int)nums.size() - 1; i >= 0; --i) {
            if (nums[i] % 2 == 0) {
                answer[i] = odd;
                ++even;
            } else {
                answer[i] = even;
                ++odd;
            }
        }
        return answer;
    }
};
