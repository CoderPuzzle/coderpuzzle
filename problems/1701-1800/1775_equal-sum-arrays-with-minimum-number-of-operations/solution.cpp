class Solution {
  public:
    int minOperations(vector<int> &nums1, vector<int> &nums2) {
        // Reachable sums are [n, 6n] per array, so equality is impossible
        // exactly when those ranges are disjoint. Otherwise tally each
        // operation's best gain (v-1 for elements of the larger-sum array,
        // 6-v for the smaller) and spend the largest gains first.
        if (nums1.size() > 6 * nums2.size() || nums2.size() > 6 * nums1.size())
            return -1;
        int sum1 = 0, sum2 = 0;
        for (int v : nums1)
            sum1 += v;
        for (int v : nums2)
            sum2 += v;
        if (sum1 == sum2)
            return 0;
        vector<int> &big = sum1 > sum2 ? nums1 : nums2;
        vector<int> &small = sum1 > sum2 ? nums2 : nums1;
        int gap = abs(sum1 - sum2);
        int gains[6] = {0};
        for (int v : big)
            gains[v - 1]++;
        for (int v : small)
            gains[6 - v]++;
        int ops = 0;
        for (int g = 5; g >= 1; --g) {
            int take = min(gains[g], (gap + g - 1) / g);
            ops += take;
            gap -= take * g;
            if (gap <= 0)
                break;
        }
        return ops;
    }
};
