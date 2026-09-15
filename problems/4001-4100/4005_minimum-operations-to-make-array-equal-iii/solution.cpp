class Solution {
  public:
    int minOperations(vector<int> &nums) {
        int n = (int)nums.size();
        // Value -> multiplicity; already uniform (covers n = 1 and the
        // all-ones array) means nothing has to move.
        unordered_map<int, long long> freq;
        for (int v : nums)
            ++freq[v];
        if (freq.size() == 1)
            return 0;

        // Sieve once to sqrt(1e9); every value factors through these primes.
        const int LIMIT = 31623;
        vector<bool> composite(LIMIT + 1, false);
        vector<int> primes;
        for (int i = 2; i <= LIMIT; ++i) {
            if (!composite[i]) {
                primes.push_back(i);
                for (long long j = (long long)i * i; j <= LIMIT; j += i)
                    composite[j] = true;
            }
        }

        auto factorize = [&](int v) {
            vector<pair<int, int>> fac;
            for (int p : primes) {
                if ((long long)p * p > v)
                    break;
                if (v % p == 0) {
                    int e = 0;
                    while (v % p == 0) {
                        v /= p;
                        ++e;
                    }
                    fac.push_back({p, e});
                }
            }
            if (v > 1)
                fac.push_back({v, 1});
            return fac;
        };
        auto divisors = [](const vector<pair<int, int>> &fac) {
            vector<long long> ds = {1};
            for (auto [p, e] : fac) {
                int size = (int)ds.size();
                long long pe = 1;
                for (int t = 0; t < e; ++t) {
                    pe *= p;
                    for (int i = 0; i < size; ++i)
                        ds.push_back(ds[i] * pe);
                }
            }
            return ds;
        };

        vector<pair<int, vector<pair<int, int>>>> facs;
        facs.reserve(freq.size());
        for (auto [v, f] : freq)
            facs.push_back({v, factorize(v)});

        // multipleCount[d] = number of elements divisible by d, folded by
        // frequency over every distinct value's divisor set.
        unordered_map<long long, long long> multipleCount;
        for (auto &[v, fac] : facs)
            for (long long d : divisors(fac))
                multipleCount[d] += freq[v];

        // A target absent from nums costs at least one operation per element
        // (>= n total), while the lcm costs at most n (every element divides
        // it in one op), so the optimum sits at a present value > 1 or at the
        // lcm itself. Track the lcm only until it outgrows any element.
        long long lcm = 1;
        bool capped = false;
        for (auto [v, f] : freq) {
            long long a = lcm, b = v;
            while (b != 0) {
                long long t = a % b;
                a = b;
                b = t;
            }
            lcm = lcm / a * v;
            if (lcm > 1000000000LL) {
                capped = true;
                break;
            }
        }
        long long best = (capped || !freq.count((int)lcm)) ? n : n - freq[(int)lcm];

        // For a target x > 1 an element equal to x pays 0, one dividing x or
        // divisible by x pays 1, anything else pays 2 (multiply by x, then
        // divide by v). Both comparable sets contain the equals, so folding
        // them in full gives cost = 2n - dd - dv with no double charge.
        for (auto &[x, fac] : facs) {
            if (x == 1)
                continue;
            long long dd = 0;
            for (long long d : divisors(fac)) {
                auto it = freq.find((int)d);
                if (it != freq.end())
                    dd += it->second;
            }
            best = min(best, 2LL * n - dd - multipleCount[x]);
        }
        return (int)best;
    }
};
