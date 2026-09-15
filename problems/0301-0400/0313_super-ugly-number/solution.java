class Solution {

    public int nthSuperUglyNumber(int n, int[] primes) {
        // Every super ugly number past 1 is a listed prime times a smaller
        // one, so build the sequence in order: one pointer per prime into
        // the built prefix, plus its cached candidate primes[p] * ugly[index[p]].
        // The next value is the smallest candidate; advancing EVERY pointer
        // whose candidate hit that minimum keeps duplicates (6 = 2 * 3 = 3 * 2)
        // out of the sequence. Candidates are longs: they overshoot the
        // 32-bit-fitting answer by up to one factor of the largest prime.
        int k = primes.length;
        long[] ugly = new long[n];
        long[] candidate = new long[k];
        int[] index = new int[k];
        ugly[0] = 1;
        for (int p = 0; p < k; ++p) candidate[p] = primes[p];
        for (int i = 1; i < n; ++i) {
            long next = candidate[0];
            for (long value : candidate) next = Math.min(next, value);
            ugly[i] = next;
            for (int p = 0; p < k; ++p) {
                if (candidate[p] == next) candidate[p] = primes[p] * ugly[++index[p]];
            }
        }
        return (int) ugly[n - 1];
    }
}
