import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

class Solution {

    public int primeSubarray(int[] nums, int k) {
        // Sieve, then slide a window whose spread is taken over prime
        // values alone: two monotonic deques of prime positions expose the
        // window's min/max prime, and lo is the minimal left end whose
        // prime spread is <= k. Widening leftward only adds primes, so the
        // starts that keep the spread <= k form a suffix; starts that keep
        // at least two primes inside form a prefix ending at prev2, the
        // second-to-last prime position at or before the right end. The
        // two ranges intersect in [lo, prev2], and each start there yields
        // one balanced subarray ending here — add its length per right end.
        int limit = 0;
        for (int value : nums) limit = Math.max(limit, value);
        boolean[] isPrime = new boolean[limit + 1];
        Arrays.fill(isPrime, 2, limit + 1, true);
        for (int value = 2; (long) value * value <= limit; value++) {
            if (isPrime[value]) {
                for (int multiple = value * value; multiple <= limit; multiple += value) {
                    isPrime[multiple] = false;
                }
            }
        }
        long total = 0;
        int lo = 0;
        int prev1 = -1; // last prime position at or before i
        int prev2 = -1; // second-to-last prime position at or before i
        Deque<Integer> mins = new ArrayDeque<>(); // values increasing
        Deque<Integer> maxs = new ArrayDeque<>(); // values decreasing
        for (int i = 0; i < nums.length; i++) {
            if (isPrime[nums[i]]) {
                while (!mins.isEmpty() && nums[mins.peekLast()] >= nums[i]) mins.pollLast();
                mins.addLast(i);
                while (!maxs.isEmpty() && nums[maxs.peekLast()] <= nums[i]) maxs.pollLast();
                maxs.addLast(i);
                prev2 = prev1;
                prev1 = i;
            }
            if (prev2 >= 0) {
                while (nums[maxs.peekFirst()] - nums[mins.peekFirst()] > k) {
                    if (mins.peekFirst() == lo) mins.pollFirst();
                    if (maxs.peekFirst() == lo) maxs.pollFirst();
                    lo++;
                }
                if (prev2 >= lo) total += prev2 - lo + 1;
            }
        }
        return (int) total;
    }
}
