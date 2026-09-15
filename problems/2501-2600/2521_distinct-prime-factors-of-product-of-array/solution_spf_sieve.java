import java.util.HashSet;
import java.util.Set;

class Solution {

    public int distinctPrimeFactors(int[] nums) {
        // The prime-support pin is the same; the factor source changes.
        // One sieve pass records the smallest prime factor of every value
        // up to max(nums), and each element then falls apart by repeated
        // division: the next piece of the remaining quotient is always a
        // table lookup, never a candidate search. Peeling each prime out
        // completely keeps the walk on sieve entries; values are <= 1000,
        // so an element holds at most 9 prime pieces (2^10 overshoots).
        int limit = 0;
        for (int value : nums) limit = Math.max(limit, value);
        int[] spf = new int[limit + 1];
        for (int i = 0; i <= limit; ++i) spf[i] = i;
        for (int i = 2; i * i <= limit; ++i) {
            if (spf[i] == i) {
                for (int j = i * i; j <= limit; j += i) {
                    if (spf[j] == j) spf[j] = i;
                }
            }
        }
        Set<Integer> primes = new HashSet<>();
        for (int value : nums) {
            int rest = value;
            while (rest > 1) {
                int p = spf[rest];
                primes.add(p);
                while (rest % p == 0) rest /= p;
            }
        }
        return primes.size();
    }
}
