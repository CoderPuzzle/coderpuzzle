class Solution {
  public:
    long long numberOfPairs(vector<int> &nums1, vector<int> &nums2, int k) {
        int highest = *max_element(nums1.begin(), nums1.end());
        vector<long long> counts1(highest + 1, 0);
        for (int num : nums1) {
            counts1[num]++;
        }
        unordered_map<int, long long> counts2;
        for (int num : nums2) {
            counts2[num]++;
        }
        long long total = 0;
        for (auto &[base, amount] : counts2) {
            long long step = (long long)base * k;
            if (step > highest) {
                continue;
            }
            long long divisible = 0;
            for (long long value = step; value <= highest; value += step) {
                divisible += counts1[value];
            }
            total += amount * divisible;
        }
        return total;
    }
};
