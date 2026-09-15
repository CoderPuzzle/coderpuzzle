class Solution {
  public:
    int centeredSubarrays(vector<int> &nums) {
        // Totals stay within 500 * 10^5 = 5 * 10^7 and the count within
        // 125,250, so int arithmetic carries both without overflow.
        int n = nums.size();
        int count = 0;
        // Anchor the left end and grow the right, carrying the window sum
        // and a counter of the values currently inside the window. The
        // window [i..j] is centered exactly when its running total is one
        // of the values the counter holds.
        for (int i = 0; i < n; i++) {
            unordered_map<int, int> window;
            int total = 0;
            for (int j = i; j < n; j++) {
                total += nums[j];
                window[nums[j]]++;
                if (window.count(total) > 0) {
                    count++;
                }
            }
        }
        return count;
    }
};
