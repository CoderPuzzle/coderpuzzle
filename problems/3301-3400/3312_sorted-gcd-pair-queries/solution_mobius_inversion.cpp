class Solution {
  public:
    vector<int> gcdValues(vector<int> &nums, vector<long long> &queries) {
        int maxValue = 0;
        for (int value : nums) {
            maxValue = max(maxValue, value);
        }
        vector<int> freq(maxValue + 1, 0);
        for (int value : nums) {
            freq[value]++;
        }
        // Mobius function over [1, maxValue] from a linear sieve: mu[1] = 1,
        // mu[n] = 0 once a squared prime divides n, else (-1)^omega(n).
        vector<int> mu(maxValue + 1, 0);
        mu[1] = 1;
        vector<bool> sieved(maxValue + 1, false);
        vector<int> primes;
        for (int i = 2; i <= maxValue; i++) {
            if (!sieved[i]) {
                primes.push_back(i);
                mu[i] = -1;
            }
            for (int prime : primes) {
                if (prime > maxValue / i) {
                    break;
                }
                int multiple = i * prime;
                sieved[multiple] = true;
                if (i % prime == 0) {
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
        vector<long long> count(maxValue + 1, 0);
        for (int d = 1; d <= maxValue; d++) {
            long long total = 0;
            for (int multiple = d; multiple <= maxValue; multiple += d) {
                total += freq[multiple];
            }
            count[d] = total;
        }
        vector<long long> pairs(maxValue + 1, 0);
        for (int d = 1; d <= maxValue; d++) {
            pairs[d] = count[d] * (count[d] - 1) / 2;
        }
        vector<long long> exact(maxValue + 1, 0);
        for (int d = 1; d <= maxValue; d++) {
            long long total = 0;
            int multiple = d;
            for (int k = 1; multiple <= maxValue; k++) {
                total += mu[k] * pairs[multiple];
                multiple += d;
            }
            exact[d] = total;
        }
        vector<long long> prefix(maxValue + 1, 0);
        long long running = 0;
        for (int d = 1; d <= maxValue; d++) {
            running += exact[d];
            prefix[d] = running;
        }
        // Query indices reach n * (n - 1) / 2 - 1 ~= 5 * 10^9 and arrive as
        // long longs; each answer is a gcd, at most 5 * 10^4.
        vector<int> answer(queries.size());
        for (int i = 0; i < (int)queries.size(); i++) {
            int lo = 1;
            int hi = maxValue;
            long long target = queries[i] + 1;
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
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
};
