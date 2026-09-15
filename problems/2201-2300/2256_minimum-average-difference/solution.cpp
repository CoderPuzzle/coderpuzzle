class Solution {
  public:
    int minimumAverageDifference(vector<int> &nums) {
        int n = static_cast<int>(nums.size());
        long long total = 0;
        for (int x : nums) {
            total += x;
        }
        long long prefix = 0;
        int bestIndex = 0;
        long long bestDiff = LLONG_MAX;
        for (int i = 0; i < n; i++) {
            prefix += nums[i];
            long long leftAvg = prefix / (i + 1);
            int rightCount = n - i - 1;
            long long rightAvg = rightCount > 0 ? (total - prefix) / rightCount : 0;
            long long diff = llabs(leftAvg - rightAvg);
            if (diff < bestDiff) {
                bestDiff = diff;
                bestIndex = i;
            }
        }
        return bestIndex;
    }
};
