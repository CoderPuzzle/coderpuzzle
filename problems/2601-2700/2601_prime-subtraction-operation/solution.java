import java.util.ArrayList;
import java.util.List;

class Solution {

    public boolean primeSubOperation(int[] nums) {
        // Sieve once up to max(nums): every usable prime sits below nums[i].
        // Greedy left to right, keeping prev = smallest feasible prefix end —
        // a smaller prefix end never constrains later elements more, so
        // committing greedily stays optimal.
        int limit = 0;
        for (int x : nums) {
            limit = Math.max(limit, x);
        }
        boolean[] composite = new boolean[limit + 1];
        List<Integer> primesList = new ArrayList<>();
        for (int i = 2; i <= limit; ++i) {
            if (!composite[i]) {
                primesList.add(i);
                for (int j = i * i; j <= limit; j += i) {
                    composite[j] = true;
                }
            }
        }
        int[] primes = new int[primesList.size()];
        for (int i = 0; i < primes.length; ++i) {
            primes[i] = primesList.get(i);
        }
        int prev = 0;
        for (int x : nums) {
            // Want the largest prime p with p < x and x - p > prev, which is
            // the largest p <= x - prev - 1 (always < x). Subtracting it then
            // beats leaving x untouched, since the result is smaller yet still
            // above prev. Manual binary search: last index with prime <= bound.
            int bound = x - prev - 1;
            int lo = 0;
            int hi = primes.length - 1;
            int best = -1;
            while (lo <= hi) {
                int mid = (lo + hi) >>> 1;
                if (primes[mid] <= bound) {
                    best = mid;
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
            if (best >= 0) {
                prev = x - primes[best];
            } else if (x > prev) {
                prev = x;
            } else {
                return false;
            }
        }
        return true;
    }
}
