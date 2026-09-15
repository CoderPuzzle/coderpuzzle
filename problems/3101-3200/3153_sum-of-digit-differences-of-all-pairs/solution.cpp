class Solution {
  public:
    long long sumDigitDifferences(vector<int> &nums) {
        long long total = 0;
        for (long long place = 1; nums[0] / place > 0; place *= 10) {
            long long counts[10] = {};
            for (int num : nums) {
                counts[num / place % 10]++;
            }
            long long pairs = 0;
            for (long long count : counts) {
                pairs += count * ((long long)nums.size() - count);
            }
            total += pairs / 2;
        }
        return total;
    }
};
