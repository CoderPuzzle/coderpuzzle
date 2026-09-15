class Solution {

    public int[] gcdValues(int[] nums, long[] queries) {
        int maxValue = 0;
        for (int value : nums) {
            maxValue = Math.max(maxValue, value);
        }
        int[] freq = new int[maxValue + 1];
        for (int value : nums) {
            freq[value]++;
        }
        // Mobius function over [1, maxValue] from a linear sieve: mu[1] = 1,
        // mu[n] = 0 once a squared prime divides n, else (-1)^omega(n).
        int[] mu = new int[maxValue + 1];
        mu[1] = 1;
        boolean[] sieved = new boolean[maxValue + 1];
        int[] primes = new int[maxValue + 1];
        int primeCount = 0;
        for (int i = 2; i <= maxValue; i++) {
            if (!sieved[i]) {
                primes[primeCount++] = i;
                mu[i] = -1;
            }
            for (int j = 0; j < primeCount; j++) {
                if (primes[j] > maxValue / i) {
                    break;
                }
                int multiple = i * primes[j];
                sieved[multiple] = true;
                if (i % primes[j] == 0) {
                    mu[multiple] = 0;
                    break;
                }
                mu[multiple] = -mu[i];
            }
        }
        // count[d]: elements divisible by d, the divisor sum of the value
        // frequencies; pairs[d] = count[d] choose 2 counts every pair whose
        // gcd is a multiple of d. Mobius inversion weighs those sums with mu
        // so the proper multiples cancel: exact[d] = sum of mu[k] * pairs[d*k].
        // Pair counts reach n * (n - 1) / 2 ~= 5 * 10^9, past int range.
        long[] count = new long[maxValue + 1];
        for (int d = 1; d <= maxValue; d++) {
            long total = 0;
            for (int multiple = d; multiple <= maxValue; multiple += d) {
                total += freq[multiple];
            }
            count[d] = total;
        }
        long[] pairs = new long[maxValue + 1];
        for (int d = 1; d <= maxValue; d++) {
            pairs[d] = (count[d] * (count[d] - 1)) / 2;
        }
        long[] exact = new long[maxValue + 1];
        for (int d = 1; d <= maxValue; d++) {
            long total = 0;
            int multiple = d;
            for (int k = 1; multiple <= maxValue; k++) {
                total += mu[k] * pairs[multiple];
                multiple += d;
            }
            exact[d] = total;
        }
        long[] prefix = new long[maxValue + 1];
        long running = 0;
        for (int d = 1; d <= maxValue; d++) {
            running += exact[d];
            prefix[d] = running;
        }
        // Query indices reach n * (n - 1) / 2 - 1 ~= 5 * 10^9 and arrive as
        // longs; each answer is a gcd, at most 5 * 10^4.
        int[] answer = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            int lo = 1;
            int hi = maxValue;
            long target = queries[i] + 1;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (prefix[mid] >= target) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            answer[i] = lo;
        }
        return answer;
    }
}
