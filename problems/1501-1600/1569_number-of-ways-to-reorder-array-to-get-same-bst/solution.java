import java.util.ArrayList;
import java.util.List;

class Solution {

    private static final long MOD = 1_000_000_007L;
    private long[] fact;
    private long[] invFact;

    public int numOfWays(int[] nums) {
        int n = nums.length;

        // Factorials and their modular inverses (Fermat's little theorem:
        // MOD is prime, so inv(k!) == (k!)^(MOD - 2) mod MOD) answer every
        // C(a, b) query in O(1).
        fact = new long[n + 1];
        invFact = new long[n + 1];
        fact[0] = 1;
        for (int i = 1; i <= n; i++) {
            fact[i] = (fact[i - 1] * i) % MOD;
        }
        invFact[n] = power(fact[n], MOD - 2);
        for (int i = n; i >= 1; i--) {
            invFact[i - 1] = (invFact[i] * i) % MOD;
        }

        List<Integer> boxed = new ArrayList<>(n);
        for (int v : nums) {
            boxed.add(v);
        }
        // The problem excludes the original array from the count.
        return (int) ((ways(boxed) - 1 + MOD) % MOD);
    }

    private long power(long base, long exp) {
        long result = 1;
        base %= MOD;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                result = (result * base) % MOD;
            }
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return result;
    }

    private long comb(int a, int b) {
        return (((fact[a] * invFact[b]) % MOD) * invFact[a - b]) % MOD;
    }

    // ways(arr) counts every reordering of arr (including arr itself) that
    // builds the same BST: split at the root arr.get(0), recurse on the
    // smaller-than-root and larger-than-root runs (each must keep its own
    // relative order), then multiply by the number of ways to interleave
    // the two runs into one sequence of their combined length, which is
    // the binomial coefficient of the two run sizes.
    private long ways(List<Integer> arr) {
        if (arr.size() <= 1) {
            return 1;
        }
        int root = arr.get(0);
        List<Integer> left = new ArrayList<>();
        List<Integer> right = new ArrayList<>();
        for (int i = 1; i < arr.size(); i++) {
            int v = arr.get(i);
            if (v < root) {
                left.add(v);
            } else {
                right.add(v);
            }
        }
        long c = comb(left.size() + right.size(), left.size());
        return (((c * ways(left)) % MOD) * ways(right)) % MOD;
    }
}
