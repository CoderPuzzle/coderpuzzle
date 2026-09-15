class Solution {
  public:
    long long continuousSubarrays(vector<int> &nums) {
        int n = nums.size();
        vector<int> minDq(n), maxDq(n); // indices; mins increasing, maxes decreasing
        int minHead = 0, minTail = 0, maxHead = 0, maxTail = 0;
        long long count = 0;
        int left = 0;
        for (int right = 0; right < n; ++right) {
            int value = nums[right];
            while (minTail > minHead && nums[minDq[minTail - 1]] >= value)
                --minTail;
            minDq[minTail++] = right;
            while (maxTail > maxHead && nums[maxDq[maxTail - 1]] <= value)
                --maxTail;
            maxDq[maxTail++] = right;
            // equality is allowed, so only a spread above 2 forces the shrink
            while (nums[maxDq[maxHead]] - nums[minDq[minHead]] > 2) {
                if (maxDq[maxHead] == left)
                    ++maxHead;
                if (minDq[minHead] == left)
                    ++minHead;
                ++left;
            }
            // every start in [left, right] keeps the spread within the band
            count += right - left + 1LL;
        }
        return count;
    }
};
