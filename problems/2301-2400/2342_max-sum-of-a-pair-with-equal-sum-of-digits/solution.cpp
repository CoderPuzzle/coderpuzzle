class Solution {
  public:
    int maximumSum(vector<int> &nums) {
        // The largest pair sum with a given first element is bounded by the
        // bucket's two largest values (each <= 10^9), so the running answer
        // stays inside int.
        unordered_map<int, int> best_by_digit_sum;
        int answer = -1;
        for (int num : nums) {
            int digit_sum = 0;
            for (int value = num; value > 0; value /= 10) {
                digit_sum += value % 10;
            }
            auto it = best_by_digit_sum.find(digit_sum);
            if (it != best_by_digit_sum.end()) {
                answer = max(answer, it->second + num);
                it->second = max(it->second, num);
            } else {
                best_by_digit_sum[digit_sum] = num;
            }
        }
        return answer;
    }
};
