class Solution {

    private static final long MOD = 1000000007L;

    public int kConcatenationMaxSum(int[] arr, int k) {
        // the best subarray never needs more than two partial copies plus
        // whole copies in between, so Kadane over two copies plus prefix
        // and suffix sums cover every candidate
        long total = 0;
        for (int value : arr) total += value;

        if (k == 1) {
            return (int) (kadane(arr, arr.length, 1) % MOD);
        }
        // two adjacent copies cover every boundary-hugging candidate
        long best = kadane(arr, arr.length, 2);
        if (k > 2 && total > 0) {
            // whole middle copies pay off only when total > 0: score the
            // best suffix + best prefix + (k - 2) full copies
            best = Math.max(best, maxSuffix(arr) + maxPrefix(arr) + (k - 2) * total);
        }
        // reduce only at the end — residues no longer compare by magnitude
        return (int) (best % MOD);
    }

    private long kadane(int[] arr, int n, int copies) {
        long best = 0;
        long current = 0;
        for (int c = 0; c < copies; c++) {
            for (int i = 0; i < n; i++) {
                // clamped at 0: the empty subarray is always an option
                current = Math.max(current + arr[i], 0);
                best = Math.max(best, current);
            }
        }
        return best;
    }

    private long maxPrefix(int[] arr) {
        long best = 0;
        long current = 0;
        for (int value : arr) {
            current += value;
            best = Math.max(best, current);
        }
        return best;
    }

    private long maxSuffix(int[] arr) {
        long best = 0;
        long current = 0;
        for (int i = arr.length - 1; i >= 0; i--) {
            current += arr[i];
            best = Math.max(best, current);
        }
        return best;
    }
}
