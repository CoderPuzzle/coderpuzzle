import java.util.Arrays;

class Solution {

    public int maxPossibleScore(int[] start, int d) {
        long[] arr = new long[start.length];
        for (int i = 0; i < start.length; i++) {
            arr[i] = start[i];
        }
        Arrays.sort(arr);
        int n = arr.length;
        long dd = d;

        long lo = 0;
        long hi = arr[n - 1] + dd - arr[0] + 1; // hi is infeasible
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2;
            if (feasible(arr, n, dd, mid)) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return (int) (lo - 1);
    }

    private boolean feasible(long[] arr, int n, long d, long x) {
        long last = arr[0];
        for (int i = 1; i < n; i++) {
            long chosen = Math.max(arr[i], last + x);
            if (chosen > arr[i] + d) {
                return false;
            }
            last = chosen;
        }
        return true;
    }
}
