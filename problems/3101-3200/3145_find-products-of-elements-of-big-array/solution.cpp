class Solution {
  public:
    vector<int> findProductsOfElements(vector<vector<long long>> &queries) {
        vector<int> result;
        result.reserve(queries.size());
        for (auto &q : queries) {
            long long exp = exponentSum(q[1] + 1) - exponentSum(q[0]);
            result.push_back((int)powmod(2, exp, q[2]));
        }
        return result;
    }

  private:
    // count of integers in [1, M] with bit b set
    long long countBit(long long M, int b) {
        if (M <= 0) {
            return 0;
        }
        long long cycle = 1LL << (b + 1);
        long long half = 1LL << b;
        long long full = (M + 1) / cycle;
        long long rem = (M + 1) % cycle;
        long long extra = rem - half;
        return full * half + max(0LL, extra);
    }

    long long popcountPrefix(long long M) {
        long long total = 0;
        int b = 0;
        while ((1LL << b) <= M) {
            total += countBit(M, b);
            b += 1;
        }
        return total;
    }

    long long bitsumPrefix(long long M) {
        long long total = 0;
        int b = 0;
        while ((1LL << b) <= M) {
            total += (long long)b * countBit(M, b);
            b += 1;
        }
        return total;
    }

    // sum of exponents of the first n elements of big_nums (n >= 0)
    long long exponentSum(long long n) {
        if (n <= 0) {
            return 0;
        }
        long long lo = 0;
        long long hi = n;
        while (lo < hi) {
            long long mid = (lo + hi + 1) / 2;
            if (popcountPrefix(mid) <= n) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        long long m = lo;
        long long total = bitsumPrefix(m);
        long long rem = n - popcountPrefix(m);
        if (rem > 0) {
            long long x = m + 1;
            int b = 0;
            while (rem > 0) {
                if ((x >> b) & 1LL) {
                    total += b;
                    rem -= 1;
                }
                b += 1;
            }
        }
        return total;
    }

    long long powmod(long long base, long long exp, long long mod) {
        base %= mod;
        long long acc = 1 % mod;
        while (exp > 0) {
            if (exp & 1LL) {
                acc = acc * base % mod;
            }
            base = base * base % mod;
            exp >>= 1;
        }
        return acc;
    }
};
