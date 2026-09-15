class Solution {

    public int countElements(int[] nums) {
        // An element qualifies exactly when it sits strictly between the
        // array's minimum and maximum: a strictly smaller witness exists
        // iff x > min, a strictly larger one iff x < max.
        int lo = Integer.MAX_VALUE;
        int hi = Integer.MIN_VALUE;
        for (int x : nums) {
            lo = Math.min(lo, x);
            hi = Math.max(hi, x);
        }
        int count = 0;
        for (int x : nums) {
            if (x > lo && x < hi) count++;
        }
        return count;
    }
}
