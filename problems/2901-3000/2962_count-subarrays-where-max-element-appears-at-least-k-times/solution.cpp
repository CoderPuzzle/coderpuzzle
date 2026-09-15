class Solution {
  public:
    long long countSubarrays(vector<int> &nums, int k) {
        // A subarray qualifies exactly when it holds >= k copies of
        // M = max(nums). Scan right ends, shrink the left end while the
        // window keeps k copies; afterwards `left` is the number of start
        // positions that still keep k copies for the current right end, so
        // each qualifying subarray is counted exactly once, at its right
        // end. Answer peaks at n*(n+1)/2 ~ 5*10^9, hence the 64-bit return.
        int m = *max_element(nums.begin(), nums.end());
        long long answer = 0;
        int left = 0;
        int count = 0;
        for (int right = 0; right < (int)nums.size(); ++right) {
            if (nums[right] == m) {
                ++count;
            }
            while (count == k) {
                if (nums[left] == m) {
                    --count;
                }
                ++left;
            }
            answer += left;
        }
        return answer;
    }
};
