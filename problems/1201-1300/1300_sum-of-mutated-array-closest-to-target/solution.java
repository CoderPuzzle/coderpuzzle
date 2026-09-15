class Solution {

    public int findBestValue(int[] arr, int target) {
        int hi = Integer.MIN_VALUE;
        for (int x : arr) hi = Math.max(hi, x);
        int lo = 0;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (mutatedSum(arr, mid) >= (long) target) hi = mid;
            else lo = mid + 1;
        }
        if (Math.abs(mutatedSum(arr, lo - 1) - target) <= Math.abs(mutatedSum(arr, lo) - target)) {
            return lo - 1;
        }
        return lo;
    }

    private long mutatedSum(int[] arr, int value) {
        long sum = 0;
        for (int x : arr) {
            sum += Math.min(x, value);
        }
        return sum;
    }
}
