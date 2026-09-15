class Solution {
  public:
    vector<int> maxScoreIndices(vector<int> &nums) {
        // score(i) = zeros in nums[:i] + ones in nums[i:]. Both addends stay
        // as running counters — ones on the right is total_ones minus the
        // ones already passed — so each of the n + 1 division points costs
        // O(1). The sweep emits indices ascending.
        int n = nums.size();
        int total_ones = 0;
        for (int value : nums) {
            total_ones += value;
        }
        int ones_left = 0;
        int zeros_left = 0;
        int best = -1;
        vector<int> answer;
        for (int i = 0; i <= n; i++) {
            int score = zeros_left + total_ones - ones_left;
            if (score > best) {
                best = score;
                answer.clear();
                answer.push_back(i);
            } else if (score == best) {
                answer.push_back(i);
            }
            if (i < n) {
                if (nums[i] == 1) {
                    ones_left++;
                } else {
                    zeros_left++;
                }
            }
        }
        return answer;
    }
};
