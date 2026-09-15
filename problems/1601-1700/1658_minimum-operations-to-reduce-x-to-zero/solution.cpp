class Solution {
  public:
    int minOperations(vector<int> &nums, int x) {
        long long total = 0;
        for (int v : nums)
            total += v;
        long long target = total - x; // longest middle subarray summing to target
        if (target < 0)
            return -1;
        if (target == 0)
            return (int)nums.size();
        int best = -1;
        long long window = 0;
        int left = 0;
        for (int right = 0; right < (int)nums.size(); right++) {
            window += nums[right];
            while (window > target) {
                window -= nums[left];
                left++;
            }
            if (window == target) {
                best = max(best, right - left + 1);
            }
        }
        return best == -1 ? -1 : (int)nums.size() - best;
    }
};
