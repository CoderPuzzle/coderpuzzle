class Solution {
  public:
    long long maximumAlternatingSubarraySum(vector<int> &nums) {
        long long plus = nums[0];
        long long minus = 0;
        bool hasMinus = false;
        long long answer = plus;

        for (int index = 1; index < static_cast<int>(nums.size()); ++index) {
            long long value = nums[index];
            long long newPlus = value;
            if (hasMinus) {
                newPlus = max(newPlus, minus + value);
            }
            long long newMinus = plus - value;

            answer = max(answer, max(newPlus, newMinus));
            plus = newPlus;
            minus = newMinus;
            hasMinus = true;
        }
        return answer;
    }
};
