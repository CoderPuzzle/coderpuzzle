class Solution {
  public:
    int longestAlternating(vector<int> &nums) {
        // Elements fit in int, and every table value, candidate, and the
        // answer stay within 2 * 10^5, so int arithmetic carries
        // everything here. inc/dec: longest alternating subarray ending
        // at i, last comparison < / >; rinc/rdec: the same starting at
        // j, by first comparison.
        int n = nums.size();
        vector<int> inc(n, 1), dec(n, 1);
        for (int i = 1; i < n; i++) {
            if (nums[i - 1] < nums[i]) {
                inc[i] = dec[i - 1] + 1;
            } else if (nums[i - 1] > nums[i]) {
                dec[i] = inc[i - 1] + 1;
            }
        }
        vector<int> rinc(n, 1), rdec(n, 1);
        for (int j = n - 2; j >= 0; j--) {
            if (nums[j] < nums[j + 1]) {
                rinc[j] = rdec[j + 1] + 1;
            } else if (nums[j] > nums[j + 1]) {
                rdec[j] = rinc[j + 1] + 1;
            }
        }
        int best = 1;
        for (int i = 0; i < n; i++) {
            if (inc[i] > best) {
                best = inc[i];
            }
            if (dec[i] > best) {
                best = dec[i];
            }
        }
        // Removing nums[r] only helps when the subarray spans it: the
        // bridge comparison nums[r-1] vs nums[r+1] must alternate with
        // both edge comparisons; equal neighbours bridge nothing.
        for (int r = 1; r < n - 1; r++) {
            int cand;
            if (nums[r - 1] < nums[r + 1]) {
                cand = dec[r - 1] + rdec[r + 1];
            } else if (nums[r - 1] > nums[r + 1]) {
                cand = inc[r - 1] + rinc[r + 1];
            } else {
                continue;
            }
            if (cand > best) {
                best = cand;
            }
        }
        return best;
    }
};
