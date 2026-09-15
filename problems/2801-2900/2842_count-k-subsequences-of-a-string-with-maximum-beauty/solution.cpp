class Solution {
  public:
    int countKSubsequencesWithMaxBeauty(string s, int k) {
        const long long MOD = 1000000007LL;
        // f(c) per letter; letters absent from s drop out of the pool.
        long long freq[26] = {};
        for (char ch : s)
            ++freq[ch - 'a'];
        // Selection-sort the (at most 26) nonzero frequencies, descending.
        vector<long long> counts;
        for (int f = 0; f < 26; ++f)
            if (freq[f])
                counts.push_back(freq[f]);
        for (int a = 0; a < int(counts.size()); ++a)
            for (int b = a + 1; b < int(counts.size()); ++b)
                if (counts[b] > counts[a])
                    swap(counts[a], counts[b]);
        // Fewer than k distinct characters: no k-subsequence exists at all.
        if (k > int(counts.size()))
            return 0;

        long long ans = 1;
        int rem = k;
        int i = 0;
        while (rem > 0) {
            int j = i;
            while (j < int(counts.size()) && counts[j] == counts[i])
                ++j;
            long long take = min(rem, j - i);
            ans = ans * comb(j - i, take) % MOD;
            ans = ans * pow_mod(counts[i], take, MOD) % MOD;
            rem -= take;
            i = j;
        }
        return ans;
    }

  private:
    // Exact: groups hold at most the 26 letters, so n <= 26 and the running
    // value never exceeds C(26, 13) = 10400600.
    static long long comb(int n, int r) {
        r = min(r, n - r);
        long long out = 1;
        for (int t = 1; t <= r; ++t)
            out = out * (n - r + t) / t;
        return out;
    }

    static long long pow_mod(long long x, long long e, long long m) {
        long long out = 1;
        for (; e > 0; e >>= 1) {
            if (e & 1)
                out = out * x % m;
            x = x * x % m;
        }
        return out;
    }
};
