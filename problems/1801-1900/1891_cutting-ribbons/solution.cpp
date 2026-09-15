class Solution {
  public:
    // Monotone predicate: sum(r / x) >= k. Binary search the largest
    // feasible x; 0 when even x=1 fails.
    long long maxLength(vector<int> &ribbons, int k) {
        long long lo = 1, hi = 0;
        for (int r : ribbons)
            hi = max(hi, (long long)r);
        long long ans = 0;
        while (lo <= hi) {
            long long mid = (lo + hi) / 2;
            long long pieces = 0;
            for (int r : ribbons)
                pieces += r / mid;
            if (pieces >= (long long)k) {
                ans = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return ans;
    }
};
