class Solution {

    public int fixedPoint(int[] arr) {
        int lo = 0,
            hi = arr.length - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] - mid >= 0) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return arr[lo] == lo ? lo : -1;
    }
}
