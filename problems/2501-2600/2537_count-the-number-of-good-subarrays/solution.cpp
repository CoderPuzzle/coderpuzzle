class Solution {
  public:
    long long countGood(vector<int> &nums, int k) {
        unordered_map<int, long long> count;
        long long pairs = 0;
        long long ans = 0;
        long long left = 0;
        long long n = nums.size();
        for (long long right = 0; right < n; right++) {
            int x = nums[right];
            // Appending a value already seen c times inside the window forms
            // exactly c new equal pairs; the map plus this running total keep
            // the pair count exact under any window move (hash map because
            // values reach 1e9).
            pairs += count[x];
            count[x] += 1;
            // Window [left, right] has >= k pairs, so it and every extension
            // of it to the right are good: exactly n - right subarrays share
            // this right endpoint and start at left or later.
            while (pairs >= k) {
                ans += n - right;
                int y = nums[left];
                // The departing value leaves count[y] copies behind, exactly
                // how many pairs its removal destroys.
                count[y] -= 1;
                pairs -= count[y];
                left += 1;
            }
        }
        return ans;
    }
};
