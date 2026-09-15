class Solution {

    public int findSpecialInteger(int[] arr) {
        // A value covering more than a quarter of the array must span at
        // least one of the positions n/4, n/2, 3n/4 (a run longer than n/4
        // cannot fit between two consecutive quarter marks). Each candidate
        // is verified by binary-searching its first and last occurrence.
        int n = arr.length;
        for (int probe : new int[] { n / 4, n / 2, (3 * n) / 4 }) {
            int candidate = arr[probe];
            if (last(arr, candidate) - first(arr, candidate) + 1 > n / 4) {
                return candidate;
            }
        }
        return arr[n - 1];
    }

    private int first(int[] arr, int value) {
        int lo = 0;
        int hi = arr.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (arr[mid] < value) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    private int last(int[] arr, int value) {
        int lo = 0;
        int hi = arr.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (arr[mid] <= value) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo - 1;
    }
}
