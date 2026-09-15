import java.util.Arrays;
import java.util.PriorityQueue;

class Solution {

    public int[] getFinalState(int[] nums, int k, int multiplier) {
        final long MOD = 1_000_000_007L;
        int n = nums.length;
        int[] result = new int[n];
        if (multiplier == 1) {
            // x * 1 == x forever: no operation ever moves a value.
            for (int i = 0; i < n; i++) {
                result[i] = (int) (nums[i] % MOD);
            }
            return result;
        }
        PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) ->
            a[0] != b[0] ? Long.compare(a[0], b[0]) : Long.compare(a[1], b[1])
        );
        for (int i = 0; i < n; i++) {
            heap.offer(new long[] { nums[i], i });
        }
        long top = nums[0];
        for (int value : nums) {
            top = Math.max(top, value);
        }
        // Simulate while the product stays within max(nums): every applied
        // value then lands at or below top, so top itself never grows and
        // each element is multiplied at most log2(top) times in this phase.
        while (k > 0 && heap.peek()[0] * multiplier <= top) {
            long[] entry = heap.poll();
            entry[0] *= multiplier;
            heap.offer(entry);
            k--;
        }
        if (k > 0) {
            // Crossover reached: multiplying the smallest now lifts it above
            // everything else, so later operations cycle through the entries
            // in non-decreasing (value, index) order. Each round scales all
            // n values by the multiplier, which preserves that inequality,
            // so the leftover k operations split into q full rounds plus one
            // extra exponent for the first rem entries of the sorted order.
            long[][] ordered = heap.toArray(new long[0][]);
            Arrays.sort(ordered, (a, b) -> a[0] != b[0] ? Long.compare(a[0], b[0]) : Long.compare(a[1], b[1]));
            long q = k / n;
            int rem = (int) (k % n);
            for (int pos = 0; pos < n; pos++) {
                long exponent = q + (pos < rem ? 1 : 0);
                result[(int) ordered[pos][1]] = (int) (((ordered[pos][0] % MOD) * powMod(multiplier, exponent, MOD)) %
                    MOD);
            }
        } else {
            for (long[] entry : heap) {
                result[(int) entry[1]] = (int) (entry[0] % MOD);
            }
        }
        return result;
    }

    private long powMod(long base, long exponent, long mod) {
        long result = 1 % mod;
        base %= mod;
        while (exponent > 0) {
            if ((exponent & 1) == 1) {
                result = (result * base) % mod;
            }
            base = (base * base) % mod;
            exponent >>= 1;
        }
        return result;
    }
}
