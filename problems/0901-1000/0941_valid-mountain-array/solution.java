class Solution {

    public boolean validMountainArray(int[] arr) {
        // Walk up while strictly increasing: where the climb stops is the
        // only candidate peak the array can offer.
        int n = arr.length;
        int i = 0;
        while (i + 1 < n && arr[i] < arr[i + 1]) {
            ++i;
        }
        // The peak must be interior: a climb that never started leaves i at
        // 0, and one that consumed the whole array parks the peak on the
        // last element.
        if (i == 0 || i == n - 1) {
            return false;
        }
        // Walk down while strictly decreasing; a valid mountain must land
        // exactly on the last index (an equal neighbor stops it early).
        while (i + 1 < n && arr[i] > arr[i + 1]) {
            ++i;
        }
        return i == n - 1;
    }
}
