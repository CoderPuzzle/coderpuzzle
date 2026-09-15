class Solution {
  public:
    long long findKthSmallest(vector<int> &coins, int k) {
        int m = coins.size();

        long long minCoin = coins[0];
        for (int c : coins) {
            if (c < minCoin)
                minCoin = c;
        }

        // count(x) is monotone; the answer is the least x with count(x) >= k
        // (the k-th multiple of the smallest coin is a safe upper bound)
        long long lo = 1, hi = (long long)k * minCoin;
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (countLe(coins, m, mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

  private:
    long long countLe(vector<int> &coins, int m, long long x) {
        long long total = 0;
        // inclusion-exclusion: each subset S contributes floor(x / lcm(S))
        for (int mask = 1; mask < (1 << m); mask++) {
            long long l = 1;
            int bits = 0;
            bool overflow = false;
            for (int j = 0; j < m; j++) {
                if (mask >> j & 1) {
                    long long g = gcdEuclid(l, coins[j]);
                    l = l / g * coins[j];
                    bits++;
                    // an lcm past x would only contribute 0; stop early
                    if (l > x) {
                        overflow = true;
                        break;
                    }
                }
            }
            if (overflow) {
                continue;
            }
            // odd subsets add, even subtract, so duplicates count once
            if (bits % 2 == 1) {
                total += x / l;
            } else {
                total -= x / l;
            }
        }
        return total;
    }

    long long gcdEuclid(long long a, long long b) {
        while (b != 0) {
            long long t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
};
