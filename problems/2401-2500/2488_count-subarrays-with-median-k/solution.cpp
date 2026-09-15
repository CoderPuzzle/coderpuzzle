class Solution {
  public:
    long long countSubarrays(vector<int> &nums, int k) {
        int n = nums.size();
        int pos = -1;
        for (int i = 0; i < n; i++) {
            if (nums[i] == k) {
                pos = i;
                break;
            }
        }
        // balance ranges over [-n, n]; offset by n.
        vector<long long> balance(2 * n + 1, 0);
        balance[n] = 1;
        int current = 0;
        long long count = 0;
        for (int i = 0; i < n; i++) {
            int v = nums[i];
            if (v > k)
                current += 1;
            else if (v < k)
                current -= 1;
            if (i >= pos) {
                count += balance[current + n] + balance[current - 1 + n];
            } else {
                balance[current + n] += 1;
            }
        }
        return count;
    }
};
