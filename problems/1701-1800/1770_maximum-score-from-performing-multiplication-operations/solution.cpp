class Solution {
  public:
    int maximumScore(vector<int> &nums, vector<int> &multipliers) {
        int m = multipliers.size();
        int n = nums.size();
        const long long NEG_INF = LLONG_MIN / 4;
        // Base: after all m operations no score remains — stage m is all 0.
        vector<long long> prev(m + 1, 0), cur(m + 1, NEG_INF);
        // State (i, l) is complete: l taken from the left forces r = i - l
        // from the right, so the remaining ends are nums[l] and
        // nums[n - 1 - r]. cur's initial -inf (and later stale entries
        // beyond l = i) sit in unreachable slots that are never read.
        for (int i = m - 1; i >= 0; i--) {
            for (int l = 0; l <= i; l++) {
                int r = i - l;
                // prev holds stage i + 1: taking the left moves to
                // (i+1, l+1), taking the right to (i+1, l).
                long long takeLeft = prev[l + 1] + (long long)multipliers[i] * nums[l];
                long long takeRight = prev[l] + (long long)multipliers[i] * nums[n - 1 - r];
                cur[l] = takeLeft >= takeRight ? takeLeft : takeRight;
            }
            swap(prev, cur);
        }
        // State (0, 0): no operations used, nothing taken from the left.
        return (int)prev[0];
    }
};
