class Solution {
  public:
    int peakIndexInMountainArray(vector<int> &arr) {
        // Binary search on the slope: a rise past mid puts the peak to the
        // right of mid, a fall puts it at mid or to its left.
        int lo = 0;
        int hi = arr.size() - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] < arr[mid + 1]) {
                // Still on the ascent, so the summit lies strictly right.
                lo = mid + 1;
            } else {
                // On the summit or the descent, so mid is safe to keep.
                hi = mid;
            }
        }
        return lo;
    }
};
