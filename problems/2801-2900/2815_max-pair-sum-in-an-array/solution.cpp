class Solution {
  public:
    int maxSum(vector<int> &nums) {
        // Every value is at most 10^4, so any pair sum stays inside int.
        unordered_map<int, int> best_by_largest_digit;
        int answer = -1;
        for (int num : nums) {
            int largest_digit = 0;
            for (int value = num; value > 0; value /= 10) {
                largest_digit = max(largest_digit, value % 10);
            }
            auto it = best_by_largest_digit.find(largest_digit);
            if (it != best_by_largest_digit.end()) {
                answer = max(answer, it->second + num);
                it->second = max(it->second, num);
            } else {
                best_by_largest_digit[largest_digit] = num;
            }
        }
        return answer;
    }
};
