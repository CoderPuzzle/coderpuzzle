class Solution {
  public:
    int totalBeauty(vector<int> &nums) {
        const int64_t MOD = 1'000'000'007;
        const int maxa = *max_element(nums.begin(), nums.end());
        // Smallest-prime-factor sieve: factorizes every distinct value once
        // so its divisors can be expanded cheaply, and each element's index
        // lands in one bucket per divisor. Bucket g then holds, in original
        // order, every position whose value is divisible by g.
        vector<int> spf(maxa + 1);
        iota(spf.begin(), spf.end(), 0);
        for (int i = 2; (int64_t)i * i <= maxa; ++i) {
            if (spf[i] == i) {
                for (int64_t j = (int64_t)i * i; j <= maxa; j += i) {
                    if (spf[j] == j) {
                        spf[j] = i;
                    }
                }
            }
        }
        vector<vector<int>> buckets(maxa + 1);
        for (int index = 0; index < (int)nums.size(); ++index) {
            vector<int> divisors{1};
            int rest = nums[index];
            while (rest > 1) {
                const int prime = spf[rest];
                int times = 0;
                while (rest % prime == 0) {
                    rest /= prime;
                    ++times;
                }
                const int seed = divisors.size();
                int64_t power = prime;
                for (int t = 0; t < times; ++t) {
                    for (int k = 0; k < seed; ++k) {
                        divisors.push_back((int)(divisors[k] * power));
                    }
                    power *= prime;
                }
            }
            for (const int d : divisors) {
                buckets[d].push_back(index);
            }
        }
        // cnt[g] counts strictly increasing subsequences whose elements are
        // all divisible by g — exactly those whose GCD is a multiple of g.
        // Walking bucket g in index order, an element contributes one plus
        // the weight already accumulated at strictly smaller scaled values,
        // which is the prefix sum a Fenwick tree keeps over value ranks.
        vector<int64_t> cnt(maxa + 1, 0);
        for (int g = 1; g <= maxa; ++g) {
            if (buckets[g].empty()) {
                continue;
            }
            const int size = maxa / g;
            vector<int64_t> fen(size + 1, 0);
            int64_t total = 0;
            for (const int i : buckets[g]) {
                const int w = nums[i] / g;
                int64_t acc = 0;
                for (int j = w - 1; j > 0; j &= j - 1) {
                    acc += fen[j];
                }
                const int64_t ways = (acc + 1) % MOD;
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
        // the answer; F[g] = 0 buckets contribute nothing.
        int64_t answer = 0;
        vector<int64_t> exact(maxa + 1, 0);
        for (int g = maxa; g >= 1; --g) {
            int64_t f = cnt[g];
            for (int k = 2 * g; k <= maxa; k += g) {
                f -= exact[k];
            }
            // The subtractions can dip below zero; % cannot be trusted to
            // normalize a negative operand in fixed-width languages.
            f %= MOD;
            if (f < 0) {
                f += MOD;
            }
            if (f != 0) {
                answer = (answer + (int64_t)g * f) % MOD;
            }
            exact[g] = f;
        }
        return (int)answer;
    }
};
