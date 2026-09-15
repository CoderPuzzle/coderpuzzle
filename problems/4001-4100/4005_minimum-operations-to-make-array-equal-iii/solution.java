import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int minOperations(int[] nums) {
        int n = nums.length;
        // Value -> multiplicity; already uniform (covers n = 1 and the
        // all-ones array) means nothing has to move.
        Map<Integer, Integer> freq = new HashMap<>();
        for (int v : nums) freq.merge(v, 1, Integer::sum);
        if (freq.size() == 1) return 0;

        // Sieve once to sqrt(1e9); every value factors through these primes.
        final int LIMIT = 31623;
        boolean[] composite = new boolean[LIMIT + 1];
        List<Integer> primeList = new ArrayList<>();
        for (int i = 2; i <= LIMIT; ++i) {
            if (!composite[i]) {
                primeList.add(i);
                for (long j = (long) i * i; j <= LIMIT; j += i) composite[(int) j] = true;
            }
        }
        int[] primes = primeList.stream().mapToInt(Integer::intValue).toArray();

        // Factorizations of every distinct value, kept for two divisor passes.
        List<Integer> distinct = new ArrayList<>(freq.keySet());
        Map<Integer, long[][]> facs = new HashMap<>();
        for (int v : distinct) facs.put(v, factorize(v, primes));

        // multipleCount[d] = number of elements divisible by d, folded by
        // frequency over every distinct value's divisor set.
        Map<Long, Long> multipleCount = new HashMap<>();
        for (int v : distinct)
            for (long d : divisors(facs.get(v))) multipleCount.merge(d, (long) freq.get(v), Long::sum);

        // A target absent from nums costs at least one operation per element
        // (>= n total), while the lcm costs at most n (every element divides
        // it in one op), so the optimum sits at a present value > 1 or at the
        // lcm itself. Track the lcm only until it outgrows any element.
        long lcm = 1;
        boolean capped = false;
        for (int v : distinct) {
            lcm = (lcm / gcd(lcm, v)) * v;
            if (lcm > 1000000000L) {
                capped = true;
                break;
            }
        }
        Integer lcmFreq = capped ? null : freq.get((int) lcm);
        long best = lcmFreq == null ? n : n - lcmFreq;

        // For a target x > 1 an element equal to x pays 0, one dividing x or
        // divisible by x pays 1, anything else pays 2 (multiply by x, then
        // divide by v). Both comparable sets contain the equals, so folding
        // them in full gives cost = 2n - dd - dv with no double charge.
        for (Map.Entry<Integer, Integer> e : freq.entrySet()) {
            int x = e.getKey();
            if (x == 1) continue;
            long dd = 0;
            for (long d : divisors(facs.get(x))) {
                Integer f = freq.get((int) d);
                if (f != null) dd += f;
            }
            best = Math.min(best, 2L * n - dd - multipleCount.get((long) x));
        }
        return (int) best;
    }

    private static long[][] factorize(int v, int[] primes) {
        List<long[]> fac = new ArrayList<>();
        for (int p : primes) {
            if ((long) p * p > v) break;
            if (v % p == 0) {
                int e = 0;
                while (v % p == 0) {
                    v /= p;
                    ++e;
                }
                fac.add(new long[] { p, e });
            }
        }
        if (v > 1) fac.add(new long[] { v, 1 });
        return fac.toArray(new long[][] {});
    }

    private static long[] divisors(long[][] fac) {
        List<Long> ds = new ArrayList<>();
        ds.add(1L);
        for (long[] pe : fac) {
            long p = pe[0];
            int e = (int) pe[1];
            int size = ds.size();
            long power = 1;
            for (int t = 0; t < e; ++t) {
                power *= p;
                for (int i = 0; i < size; ++i) ds.add(ds.get(i) * power);
            }
        }
        long[] out = new long[ds.size()];
        for (int i = 0; i < out.length; ++i) out[i] = ds.get(i);
        return out;
    }

    private static long gcd(long a, long b) {
        while (b != 0) {
            long t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
