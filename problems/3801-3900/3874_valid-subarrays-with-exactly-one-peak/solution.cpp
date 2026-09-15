class Solution {
  public:
    long long validSubarrays(vector<int> &nums, int k) {
        // Each peak is the only peak in exactly those subarrays whose left
        // endpoint stays past the previous peak and whose right endpoint
        // stays before the next peak, both also within k of the peak. The
        // count can reach (n/2+1)*(n/2) on a single-peaked array, so the
        // running total lives in a long long.
        int n = nums.size();
        vector<int> peaks;
        for (int i = 1; i < n - 1; i++) {
            if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
                peaks.push_back(i);
            }
        }
        long long total = 0;
        for (int idx = 0; idx < (int)peaks.size(); idx++) {
            int i = peaks[idx];
            int prev = idx > 0 ? peaks[idx - 1] : -1;
            int nxt = idx + 1 < (int)peaks.size() ? peaks[idx + 1] : n;
            int lo = max(i - k, prev + 1);
            int hi = min(i + k, nxt - 1);
            total += (long long)(i - lo + 1) * (hi - i + 1);
        }
        return total;
    }
};
