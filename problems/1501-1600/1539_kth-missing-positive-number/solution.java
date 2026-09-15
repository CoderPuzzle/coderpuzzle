class Solution {

    public int findKthPositive(int[] arr, int k) {
        int n = arr.length;
        // Smallest index whose missing count reaches k; hi = n lets the
        // search converge past the end when the whole array falls short.
        // A gapless array would have arr[i] = i + 1, so arr[i] - (i + 1)
        // counts the positive integers absent up through arr[i], and that
        // count is non-decreasing.
        int lo = 0,
            hi = n;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] - (mid + 1) < k) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        // Every index before lo accounts for fewer than k missing numbers,
        // so the kth missing positive is exactly k past that point.
        return lo + k;
    }
}
