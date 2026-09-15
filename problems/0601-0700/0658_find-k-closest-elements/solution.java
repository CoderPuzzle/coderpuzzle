class Solution {

    public int[] findClosestElements(int[] arr, int k, int x) {
        // The k closest elements form a contiguous block, so binary search the
        // block's start over [0, n - k].
        int lo = 0;
        int hi = arr.length - k;
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
        int[] result = new int[k];
        System.arraycopy(arr, lo, result, 0, k);
        return result;
    }
}
