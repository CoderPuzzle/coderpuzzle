class Solution {
  public:
    // Collect distinct substring values (leading zeros vanish on parse),
    // walk them from the largest down, and primality-test each by trial
    // division until three primes have been summed.
    long long sumOfLargestPrimes(string s) {
        int n = s.size();
        unordered_set<long long> seen;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j <= n; j++) {
                seen.insert(stoll(s.substr(i, j - i)));
            }
        }
        vector<long long> values(seen.begin(), seen.end());
        sort(values.begin(), values.end(), greater<long long>());
        long long total = 0;
        int found = 0;
        for (long long v : values) {
            if (isPrime(v)) {
                total += v;
                found++;
                if (found == 3) {
                    break;
                }
            }
        }
        return total;
    }

  private:
    bool isPrime(long long v) {
        if (v < 2) {
            return false;
        }
        if (v % 2 == 0) {
            return v == 2;
        }
        for (long long f = 3; f * f <= v; f += 2) {
            if (v % f == 0) {
                return false;
            }
        }
        return true;
    }
};
