import java.util.ArrayList;
import java.util.List;

class Solution {

    public int totalBeauty(int[] nums) {
        final long MOD = 1_000_000_007L;
        int maxa = 0;
        for (int v : nums) {
            maxa = Math.max(maxa, v);
        }
        // Smallest-prime-factor sieve: factorizes every distinct value once
        // so its divisors can be expanded cheaply, and each element's index
        // lands in one bucket per divisor. Bucket g then holds, in original
        // order, every position whose value is divisible by g.
        int[] spf = new int[maxa + 1];
        for (int i = 0; i <= maxa; i++) {
            spf[i] = i;
        }
        for (int i = 2; (long) i * i <= maxa; i++) {
            if (spf[i] == i) {
                for (long j = (long) i * i; j <= maxa; j += i) {
                    if (spf[(int) j] == j) {
                        spf[(int) j] = i;
                    }
                }
            }
        }
        List<List<Integer>> buckets = new ArrayList<>(maxa + 1);
        for (int i = 0; i <= maxa; i++) {
            buckets.add(new ArrayList<>());
        }
        for (int index = 0; index < nums.length; index++) {
            List<Integer> divisors = new ArrayList<>();
            divisors.add(1);
            int rest = nums[index];
            while (rest > 1) {
                int prime = spf[rest];
                int times = 0;
                while (rest % prime == 0) {
                    rest /= prime;
                    times++;
                }
                int seed = divisors.size();
                long power = prime;
                for (int t = 0; t < times; t++) {
                    for (int k = 0; k < seed; k++) {
                        divisors.add((int) (divisors.get(k) * power));
                    }
                    power *= prime;
                }
            }
            for (int d : divisors) {
                buckets.get(d).add(index);
            }
        }
        // cnt[g] counts strictly increasing subsequences whose elements are
        // all divisible by g — exactly those whose GCD is a multiple of g.
        // Walking bucket g in index order, an element contributes one plus
        // the weight already accumulated at strictly smaller scaled values,
        // which is the prefix sum a Fenwick tree keeps over value ranks.
        long[] cnt = new long[maxa + 1];
        for (int g = 1; g <= maxa; g++) {
            List<Integer> positions = buckets.get(g);
            if (positions.isEmpty()) {
                continue;
            }
            int size = maxa / g;
            long[] fen = new long[size + 1];
            long total = 0;
            for (int i : positions) {
                int w = nums[i] / g;
                long acc = 0;
                for (int j = w - 1; j > 0; j &= j - 1) {
                    acc += fen[j];
                }
                long ways = (acc + 1) % MOD;
                for (int j = w; j <= size; j += j & -j) {
                    fen[j] = (fen[j] + ways) % MOD;
                }
                total += ways;
            }
            cnt[g] = total % MOD;
        }
        // Descending sweep converts divisible-by counts into exactly-g
        // counts: by the time g is reached, every proper multiple has been
        // finalized and can be subtracted out. Each surviving g*F[g] joins
        // the answer. The subtractions can dip below zero and Java's % keeps
        // the sign, so f is renormalized before it is reused or banked.
        long answer = 0;
        long[] exact = new long[maxa + 1];
        for (int g = maxa; g >= 1; g--) {
            long f = cnt[g];
            for (int k = 2 * g; k <= maxa; k += g) {
                f -= exact[k];
            }
            f %= MOD;
            if (f < 0) {
                f += MOD;
            }
            if (f != 0) {
                answer = (answer + (long) g * f) % MOD;
            }
            exact[g] = f;
        }
        return (int) answer;
    }
}
