class Solution {
  public:
    long long largestEvenSum(vector<int> &nums, int k) {
        sort(nums.begin(), nums.end(), greater<int>());
        long long total = 0;
        int smallestSelected[2] = {-1, -1};
        for (int i = 0; i < k; ++i) {
            total += nums[i];
            smallestSelected[nums[i] % 2] = nums[i];
        }
        if (total % 2 == 0) {
            return total;
        }

        int largestUnselected[2] = {-1, -1};
        for (int i = k; i < static_cast<int>(nums.size()); ++i) {
            int parity = nums[i] % 2;
            if (largestUnselected[parity] == -1) {
                largestUnselected[parity] = nums[i];
            }
        }

        long long answer = -1;
        for (int parity = 0; parity < 2; ++parity) {
            if (smallestSelected[parity] != -1 && largestUnselected[1 - parity] != -1) {
                answer = max(answer, total - smallestSelected[parity] + largestUnselected[1 - parity]);
            }
        }
        return answer;
    }
};
