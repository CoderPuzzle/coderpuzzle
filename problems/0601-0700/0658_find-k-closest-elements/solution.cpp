class Solution {
  public:
    vector<int> findClosestElements(vector<int> &arr, int k, int x) {
        // The k closest elements form a contiguous block, so binary search the
        // block's start over [0, n - k].
        int lo = 0;
        int hi = (int)arr.size() - k;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            // Compare the kept left edge arr[mid] with arr[mid + k], the first
            // excluded element: if the excluded one is strictly closer, this
            // start (and every earlier one) is beatable.
            if (x - arr[mid] > arr[mid + k] - x) {
                lo = mid + 1;
            } else {
                // Left is at least as close; ties keep the smaller elements here.
                hi = mid;
            }
        }
        return vector<int>(arr.begin() + lo, arr.begin() + lo + k);
    }
};
