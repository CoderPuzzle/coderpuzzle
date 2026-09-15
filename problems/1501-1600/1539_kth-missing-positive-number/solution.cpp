class Solution {
  public:
    int findKthPositive(vector<int> &arr, int k) {
        int n = arr.size();
        // A gapless array would have arr[i] = i + 1, so missing(i) counts
        // the positive integers absent up through arr[i]; it is
        // non-decreasing.
        auto missing = [&](int i) { return arr[i] - (i + 1); };
        // Smallest index whose missing count reaches k; hi = n lets the
        // search converge past the end when the whole array falls short.
        int lo = 0, hi = n;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (missing(mid) < k) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        // Every index before lo accounts for fewer than k missing numbers,
        // so the kth missing positive is exactly k past that point.
        return lo + k;
    }
};
