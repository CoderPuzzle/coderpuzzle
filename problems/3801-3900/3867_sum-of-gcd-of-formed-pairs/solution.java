import java.util.Arrays;

class Solution {

    public long gcdSum(int[] nums) {
        // prefixGcd[i] is gcd(nums[i], running max so far). Once built, the
        // sorted list is paired smallest-with-largest, and each pair's gcd
        // is summed — a two-pointer walk from both ends. Widen to long: the
        // sum of up to 5e4 gcds, each as large as 1e9, reaches ~5e13.
        long[] prefixGcd = new long[nums.length];
        long running = 0;
        for (int i = 0; i < nums.length; i++) {
            running = Math.max(running, nums[i]);
            prefixGcd[i] = gcd(nums[i], running);
        }
        Arrays.sort(prefixGcd);
        int lo = 0;
        int hi = nums.length - 1;
        long total = 0;
        while (lo < hi) {
            total += gcd(prefixGcd[lo], prefixGcd[hi]);
            lo++;
            hi--;
        }
        return total;
    }

    private long gcd(long a, long b) {
        while (b != 0) {
            long t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
