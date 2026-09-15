class Solution {
  public:
    int minSwaps(vector<int> &nums, vector<int> &forbidden) {
        // A swap repairs at most two bad positions, and two bad positions
        // sharing a value cannot repair each other, so the answer is at
        // least max(ceil(bad/2), worst same-value cluster). A value whose
        // combined count in nums and forbidden exceeds n has nowhere to
        // hide and makes the task impossible; otherwise both lower bounds
        // are achievable, and their max is the answer.
        int n = nums.size();
        unordered_map<int, int> freq;
        for (int x : nums) {
            freq[x]++;
        }
        for (int x : forbidden) {
            freq[x]++;
        }
        for (const auto &kv : freq) {
            if (kv.second >= n + 1) {
                return -1;
            }
        }
        unordered_map<int, int> bad;
        for (int i = 0; i < n; i++) {
            if (nums[i] == forbidden[i]) {
                bad[nums[i]]++;
            }
        }
        int total = 0;
        int worst = 0;
        for (const auto &kv : bad) {
            total += kv.second;
            worst = max(worst, kv.second);
        }
        return max((total + 1) / 2, worst);
    }
};
