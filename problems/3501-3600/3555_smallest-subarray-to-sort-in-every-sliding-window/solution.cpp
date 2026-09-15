class Solution {
  public:
    // Per window (hint 2): the segment to sort ends at the last element
    // smaller than the running max before it, and starts at the first
    // element larger than the running min after it. A sorted window sets
    // neither boundary, so its answer is 0.
    vector<int> minSubarraySort(vector<int> &nums, int k) {
        int n = nums.size();
        vector<int> res(n - k + 1);
        for (int s = 0; s + k <= n; s++) {
            int e = s + k;
            int right = -1, mx = 0;
            for (int i = s; i < e; i++) {
                if (nums[i] < mx) {
                    right = i;
                } else {
                    mx = nums[i];
                }
            }
            if (right == -1) {
                res[s] = 0;
                continue;
            }
            int left = 0, mn = INT_MAX;
            for (int i = e - 1; i >= s; i--) {
                if (nums[i] > mn) {
                    left = i;
                } else {
                    mn = nums[i];
                }
            }
            res[s] = right - left + 1;
        }
        return res;
    }
};
