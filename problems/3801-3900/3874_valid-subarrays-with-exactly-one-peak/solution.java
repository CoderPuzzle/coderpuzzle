class Solution {

    public long validSubarrays(int[] nums, int k) {
        // Each peak is the only peak in exactly those subarrays whose left
        // endpoint stays past the previous peak and whose right endpoint
        // stays before the next peak, both also within k of the peak. The
        // count can reach (n/2+1)*(n/2) on a single-peaked array, so the
        // running total lives in a long.
        int n = nums.length;
        int[] peaks = new int[n];
        int pc = 0;
        for (int i = 1; i < n - 1; i++) {
            if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
                peaks[pc++] = i;
            }
        }
        long total = 0;
        for (int idx = 0; idx < pc; idx++) {
            int i = peaks[idx];
            int prev = idx > 0 ? peaks[idx - 1] : -1;
            int nxt = idx + 1 < pc ? peaks[idx + 1] : n;
            int lo = Math.max(i - k, prev + 1);
            int hi = Math.min(i + k, nxt - 1);
            total += (long) (i - lo + 1) * (hi - i + 1);
        }
        return total;
    }
}
